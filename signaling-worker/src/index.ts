import { DurableObject } from "cloudflare:workers";

export interface Env {
  SIGNALING_ROOM: DurableObjectNamespace<SignalingRoom>;
}

interface PeerAttachment {
  peerId: string;
  roomId: string;
  metadata?: Record<string, unknown>;
  joinedAt: number;
}

interface SignalMessage {
  type: "join" | "signal" | "leave" | "ping";
  targetPeerId?: string;
  data?: unknown;
  metadata?: Record<string, unknown>;
}

// Durable Object handling WebRTC signaling for a specific Room
export class SignalingRoom extends DurableObject {
  private roomId: string = "";

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Ensure WebSocket upgrade request
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket upgrade", { status: 426 });
    }

    const peerId = url.searchParams.get("peerId") || crypto.randomUUID().slice(0, 8);
    this.roomId = url.searchParams.get("roomId") || "default";

    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];

    const attachment: PeerAttachment = {
      peerId,
      roomId: this.roomId,
      joinedAt: Date.now(),
    };

    // Accept WebSocket with tag = peerId for O(1) lookup
    this.ctx.acceptWebSocket(server, [peerId]);
    server.serializeAttachment(attachment);

    // Notify the newly connected peer about their assigned peerId and current peers in room
    const existingSockets = this.ctx.getWebSockets();
    const existingPeers = existingSockets
      .map((s) => {
        try {
          return s.deserializeAttachment() as PeerAttachment | null;
        } catch {
          return null;
        }
      })
      .filter((p): p is PeerAttachment => Boolean(p && p.peerId !== peerId))
      .map((p) => ({ peerId: p.peerId, metadata: p.metadata }));

    server.send(
      JSON.stringify({
        type: "welcome",
        peerId,
        roomId: this.roomId,
        peers: existingPeers,
      })
    );

    // Broadcast "peer_joined" to other peers in this room
    this.broadcast(
      JSON.stringify({
        type: "peer_joined",
        peerId,
      }),
      peerId
    );

    return new Response(null, { status: 101, webSocket: client });
  }

  // WebSocket message received (wakes up from hibernation)
  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    if (typeof message !== "string") return;

    let payload: SignalMessage;
    try {
      payload = JSON.parse(message);
    } catch {
      return;
    }

    const currentPeer = ws.deserializeAttachment() as PeerAttachment | null;
    const fromPeerId = currentPeer?.peerId;

    if (!fromPeerId) return;

    switch (payload.type) {
      case "ping":
        ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
        break;

      case "join":
        if (payload.metadata && currentPeer) {
          currentPeer.metadata = payload.metadata;
          ws.serializeAttachment(currentPeer);
          // Broadcast updated metadata
          this.broadcast(
            JSON.stringify({
              type: "peer_updated",
              peerId: fromPeerId,
              metadata: payload.metadata,
            }),
            fromPeerId
          );
        }
        break;

      case "signal":
        // Direct WebRTC signaling packet (SDP offer/answer or ICE candidate)
        if (payload.targetPeerId) {
          const targetSockets = this.ctx.getWebSockets(payload.targetPeerId);
          const messageToSend = JSON.stringify({
            type: "signal",
            fromPeerId,
            data: payload.data,
          });
          for (const targetWs of targetSockets) {
            try {
              targetWs.send(messageToSend);
            } catch {
              // Ignore disconnected socket
            }
          }
        }
        break;

      case "leave":
        ws.close(1000, "Left room");
        break;
    }
  }

  // WebSocket closed (handles cleanup and informs remaining peers)
  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean): Promise<void> {
    const peer = ws.deserializeAttachment() as PeerAttachment | null;
    if (peer?.peerId) {
      this.broadcast(
        JSON.stringify({
          type: "peer_left",
          peerId: peer.peerId,
        }),
        peer.peerId
      );
    }
    ws.close(code, "Closed by server");
  }

  async webSocketError(ws: WebSocket, error: unknown): Promise<void> {
    const peer = ws.deserializeAttachment() as PeerAttachment | null;
    if (peer?.peerId) {
      this.broadcast(
        JSON.stringify({
          type: "peer_left",
          peerId: peer.peerId,
        }),
        peer.peerId
      );
    }
    try {
      ws.close(1011, "WebSocket error");
    } catch {
      // Ignore
    }
  }

  private broadcast(message: string, excludePeerId?: string): void {
    const sockets = this.ctx.getWebSockets();
    for (const s of sockets) {
      try {
        const p = s.deserializeAttachment() as PeerAttachment | null;
        if (excludePeerId && p?.peerId === excludePeerId) {
          continue;
        }
        s.send(message);
      } catch {
        // Socket may have closed
      }
    }
  }
}

// Worker router entry point
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    // Health check
    if (url.pathname === "/health" || url.pathname === "/") {
      return new Response(
        JSON.stringify({
          status: "healthy",
          service: "webtoolseasy-signaling",
          timestamp: new Date().toISOString(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Generate easy 6-digit alphanumeric room code (e.g. 734-921 or P2P-892)
    if (url.pathname === "/new-room") {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const formatted = `${code.slice(0, 3)}-${code.slice(3)}`;
      return new Response(
        JSON.stringify({
          roomId: formatted,
          rawCode: code,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // WebSocket Room Route: /room/:roomId
    const match = url.pathname.match(/^\/room\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const roomId = match[1].toUpperCase();
      const id = env.SIGNALING_ROOM.idFromName(roomId);
      const roomObject = env.SIGNALING_ROOM.get(id);

      // Pass query params and forward to the Durable Object
      url.searchParams.set("roomId", roomId);
      return roomObject.fetch(new Request(url.toString(), request));
    }

    return new Response("Not Found", { status: 404 });
  },
};

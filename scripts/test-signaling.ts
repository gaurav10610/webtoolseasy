import WebSocket from "ws";

async function testSignaling() {
  const roomId = "TEST" + Math.floor(Math.random() * 1000);
  const urlA = `wss://webtoolseasy-signaling.gaurav10610.workers.dev/room/${roomId}?peerId=PEER_A`;
  const urlB = `wss://webtoolseasy-signaling.gaurav10610.workers.dev/room/${roomId}?peerId=PEER_B`;

  console.log(`Testing room: ${roomId}`);

  const wsA = new WebSocket(urlA);
  const wsB = new WebSocket(urlB);

  wsA.on("open", () => {
    console.log("wsA connected, sending join...");
    wsA.send(JSON.stringify({ type: "join", metadata: { role: "sender" } }));
  });

  wsA.on("message", (data) => {
    console.log("[wsA received]", data.toString());
  });

  wsA.on("error", (err) => console.error("wsA error:", err));

  setTimeout(() => {
    wsB.on("open", () => {
      console.log("wsB connected, sending join...");
      wsB.send(JSON.stringify({ type: "join", metadata: { role: "receiver" } }));
    });

    wsB.on("message", (data) => {
      console.log("[wsB received]", data.toString());
    });

    wsB.on("error", (err) => console.error("wsB error:", err));
  }, 1000);

  setTimeout(() => {
    console.log("\nwsA sending signal to PEER_B...");
    wsA.send(JSON.stringify({ type: "signal", targetPeerId: "PEER_B", data: { sdp: "test-sdp" } }));
  }, 2500);

  setTimeout(() => {
    console.log("Closing test...");
    wsA.close();
    wsB.close();
  }, 4000);
}

testSignaling().catch(console.error);

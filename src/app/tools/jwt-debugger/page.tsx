"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { decodeJwt, encodeJwt, JwtData } from "@/utils/jwtUtils";

const DEFAULT_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDebuggerPage() {
  const [token, setToken] = useState(DEFAULT_JWT);
  const [data, setData] = useState<JwtData | null>(null);

  // Editor states (stringified JSON)
  const [headerJson, setHeaderJson] = useState("");
  const [payloadJson, setPayloadJson] = useState("");

  // Parse JWT on token change
  useEffect(() => {
    if (!token.trim()) {
      setData(null);
      setHeaderJson("");
      setPayloadJson("");
      return;
    }

    const decoded = decodeJwt(token);
    setData(decoded);

    if (decoded.isValid) {
      setHeaderJson(JSON.stringify(decoded.header, null, 2));
      setPayloadJson(JSON.stringify(decoded.payload, null, 2));
    } else {
      setHeaderJson("");
      setPayloadJson("");
    }
  }, [token]);

  // Handle Payload changes from Editor
  const handlePayloadChange = (val: string) => {
    setPayloadJson(val);
    if (!data?.isValid) return;

    try {
      const parsedPayload = JSON.parse(val);
      // Valid JSON payload, let's encode back into the token string!
      const newToken = encodeJwt(data.header, parsedPayload, data.signature);
      if (newToken) {
        setToken(newToken);
      }
    } catch {
      // Invalid JSON during edit, do not update token string
    }
  };

  // Extract colorized parts for the JWT string display
  const renderColorizedJwt = () => {
    if (!token) return <span className="text-gray-500">Paste a JWT token here...</span>;
    
    const parts = token.split(".");
    return (
      <div className="break-all font-mono text-lg leading-relaxed">
        <span className="text-red-400">{parts[0] || ""}</span>
        {parts.length > 1 && <span className="text-gray-400">.</span>}
        <span className="text-purple-400">{parts[1] || ""}</span>
        {parts.length > 2 && <span className="text-gray-400">.</span>}
        <span className="text-emerald-400">{parts[2] || ""}</span>
      </div>
    );
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">100% Offline Secure</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Secure JWT Debugger
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Decode, verify, and edit JSON Web Tokens locally. Your sensitive tokens never leave your browser.
            </p>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Left Column: Encoded Token */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden h-full">
              <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-300">Encoded JWT Token</span>
                {data?.error && <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">Invalid Signature/Format</span>}
              </div>
              
              <div className="flex-1 relative">
                {/* Invisible textarea for actual typing/pasting overlaying the colorized div */}
                <textarea
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-6 font-mono text-lg resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 z-10"
                  spellCheck="false"
                />
                <div className="absolute inset-0 p-6 pointer-events-none z-0">
                  {renderColorizedJwt()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Decoded Payload */}
          <div className="flex flex-col gap-4">
            {/* Header Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden h-[30%]">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3">
                <span className="text-sm font-bold text-red-400">Header <span className="text-gray-500 font-normal">(Algorithm & Type)</span></span>
              </div>
              <div className="flex-1 p-0">
                <textarea
                  value={headerJson}
                  readOnly
                  className="w-full h-full bg-transparent text-red-300 font-mono text-sm p-4 resize-none focus:outline-none"
                  placeholder={data?.error ? "Fix token errors to view header" : ""}
                />
              </div>
            </div>

            {/* Payload Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden h-[50%]">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-purple-400">Payload <span className="text-gray-500 font-normal">(Data)</span></span>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Editable</span>
              </div>
              <div className="flex-1 p-0">
                <textarea
                  value={payloadJson}
                  onChange={(e) => handlePayloadChange(e.target.value)}
                  className="w-full h-full bg-transparent text-purple-300 font-mono text-sm p-4 resize-none focus:outline-none focus:bg-white/[0.02] transition-colors"
                  spellCheck="false"
                  placeholder={data?.error ? "Fix token errors to view payload" : ""}
                />
              </div>
            </div>

            {/* Signature Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden h-[20%]">
              <div className="bg-white/5 border-b border-white/10 px-6 py-3">
                <span className="text-sm font-bold text-emerald-400">Signature</span>
              </div>
              <div className="flex-1 p-4 flex items-center">
                <div className="font-mono text-emerald-300/70 text-sm break-all">
                  {data?.signature || (data?.error ? "Missing signature" : "HMACSHA256(base64UrlEncode(header) + \".\" + base64UrlEncode(payload), your-256-bit-secret)")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { RsaKeySize, generateRsaKeyPair, KeyPairResult } from "@/utils/cryptoUtils";

export default function RsaGeneratorPage() {
  const [keySize, setKeySize] = useState<RsaKeySize>(2048);
  const [keys, setKeys] = useState<KeyPairResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setKeys(null);
    setCopiedPublic(false);
    setCopiedPrivate(false);
    
    try {
      // Small timeout to let UI update state to "Generating..." before heavy sync crypto operation blocks thread
      setTimeout(async () => {
        try {
          const result = await generateRsaKeyPair(keySize);
          setKeys(result);
        } catch (e) {
          console.error("Failed to generate keys:", e);
        } finally {
          setIsGenerating(false);
        }
      }, 50);
    } catch (e) {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, isPublic: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isPublic) {
        setCopiedPublic(true);
        setTimeout(() => setCopiedPublic(false), 2000);
      } else {
        setCopiedPrivate(true);
        setTimeout(() => setCopiedPrivate(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadKey = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="success" className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Client-Side WebCrypto API</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            RSA Key Pair Generator
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Securely generate RSA-OAEP public and private keys using your browser's native cryptographic engine. Keys are never transmitted over the internet.
          </p>
        </div>

        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col p-6 gap-6 relative overflow-hidden group mb-8">
          <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[100%] w-[50%] rounded-full bg-emerald-500/5 blur-[100px] transition-all group-hover:bg-emerald-500/10" />
          
          <div className="flex flex-col md:flex-row items-end gap-6 relative z-10">
            <div className="flex-1 w-full relative">
              <label className="text-sm font-bold text-gray-400 mb-2 block">Key Size (Bits)</label>
              <div className="flex gap-2 w-full">
                {([1024, 2048, 4096] as RsaKeySize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setKeySize(size)}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors border ${
                      keySize === size 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                        : 'bg-black/40 text-gray-400 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50 min-w-[200px]"
            >
              {isGenerating ? "Generating Keys..." : "Generate Key Pair"}
            </button>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8">
          
          {/* Public Key Pane */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Public Key (SPKI)
            </h2>
            
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col h-[400px]">
              <textarea 
                readOnly
                value={keys?.publicKeyPem || "Generate a key pair first..."}
                className="flex-1 w-full bg-transparent text-emerald-300/80 font-mono text-xs resize-none focus:outline-none focus:text-emerald-300"
              />
              
              <div className="flex gap-3 pt-4 border-t border-white/5 mt-4">
                <button
                  disabled={!keys}
                  onClick={() => keys && copyToClipboard(keys.publicKeyPem, true)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {copiedPublic ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  disabled={!keys}
                  onClick={() => keys && downloadKey(keys.publicKeyPem, "public.pem")}
                  className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-bold rounded-lg transition-colors border border-emerald-500/30 disabled:opacity-50"
                >
                  Download .pem
                </button>
              </div>
            </div>
          </div>

          {/* Private Key Pane */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Private Key (PKCS#8)
            </h2>
            
            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col h-[400px]">
              <textarea 
                readOnly
                value={keys?.privateKeyPem || "Generate a key pair first..."}
                className="flex-1 w-full bg-transparent text-rose-300/80 font-mono text-xs resize-none focus:outline-none focus:text-rose-300"
              />
              
              <div className="flex gap-3 pt-4 border-t border-white/5 mt-4">
                <button
                  disabled={!keys}
                  onClick={() => keys && copyToClipboard(keys.privateKeyPem, false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {copiedPrivate ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  disabled={!keys}
                  onClick={() => keys && downloadKey(keys.privateKeyPem, "private.pem")}
                  className="flex-1 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-sm font-bold rounded-lg transition-colors border border-rose-500/30 disabled:opacity-50"
                >
                  Download .pem
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { generateBcryptHash, verifyBcryptHash } from "@/utils/bcryptUtils";

export default function BcryptGeneratorPage() {
  // Hash Generator State
  const [genPassword, setGenPassword] = useState("my_secure_password");
  const [saltRounds, setSaltRounds] = useState(10);
  const [generatedHash, setGeneratedHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Hash Verifier State
  const [verPassword, setVerPassword] = useState("my_secure_password");
  const [verHash, setVerHash] = useState("");
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Generator Effect
  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      if (!genPassword) {
        if (isMounted) setGeneratedHash("");
        return;
      }
      setIsGenerating(true);
      try {
        const hash = await generateBcryptHash(genPassword, saltRounds);
        if (isMounted) {
          setGeneratedHash(hash);
        }
      } catch (e) {
        if (isMounted) setGeneratedHash("Error generating hash");
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    // Debounce slightly to prevent blocking UI on heavy rounds
    const timeout = setTimeout(generate, 300);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [genPassword, saltRounds]);

  // Verifier Effect
  useEffect(() => {
    let isMounted = true;
    const verify = async () => {
      if (!verPassword || !verHash) {
        if (isMounted) setIsMatch(null);
        return;
      }
      setIsVerifying(true);
      try {
        const match = await verifyBcryptHash(verPassword, verHash);
        if (isMounted) setIsMatch(match);
      } catch (e) {
        if (isMounted) setIsMatch(false);
      } finally {
        if (isMounted) setIsVerifying(false);
      }
    };

    const timeout = setTimeout(verify, 300);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [verPassword, verHash]);

  // Initialize Verifier Hash with the Generated Hash once it loads
  useEffect(() => {
    if (generatedHash && !verHash) {
      setVerHash(generatedHash);
    }
  }, [generatedHash]);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="info" className="mb-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Client-Side Security</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Bcrypt Hash Generator
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Securely generate and verify Bcrypt password hashes directly in your browser. Your plaintext passwords are never transmitted.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Generator */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Hash Generator
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col p-6 gap-6 relative overflow-hidden group">
              <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-[60%] w-[60%] rounded-full bg-yellow-500/5 blur-[80px] transition-all group-hover:bg-yellow-500/10" />
              
              <div className="relative">
                <label className="text-sm font-bold text-gray-400 mb-2 block">Plaintext Password</label>
                <input 
                  type="text"
                  value={genPassword}
                  onChange={(e) => setGenPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors font-mono"
                  placeholder="Enter string to hash..."
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-400">Salt Rounds</label>
                  <span className="text-sm font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded">{saltRounds}</span>
                </div>
                <input 
                  type="range"
                  min="4"
                  max="14"
                  value={saltRounds}
                  onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                  className="w-full accent-yellow-500"
                />
                <p className="text-xs text-gray-500 mt-2">Higher rounds increase security but take exponentially longer to compute.</p>
              </div>

              <div className="relative bg-black/60 rounded-xl p-4 border border-white/5">
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Generated Bcrypt Hash</label>
                {isGenerating ? (
                  <div className="text-yellow-400/50 font-mono animate-pulse">Computing...</div>
                ) : (
                  <div className="text-yellow-400 font-mono break-all">{generatedHash || "N/A"}</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Verifier */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
              Hash Verifier
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col p-6 gap-6 relative overflow-hidden group">
              <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-[60%] w-[60%] rounded-full bg-emerald-500/5 blur-[80px] transition-all group-hover:bg-emerald-500/10" />
              
              <div className="relative">
                <label className="text-sm font-bold text-gray-400 mb-2 block">String to Compare</label>
                <input 
                  type="text"
                  value={verPassword}
                  onChange={(e) => setVerPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-mono"
                  placeholder="Enter plaintext string..."
                />
              </div>

              <div className="relative">
                <label className="text-sm font-bold text-gray-400 mb-2 block">Bcrypt Hash</label>
                <input 
                  type="text"
                  value={verHash}
                  onChange={(e) => setVerHash(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors font-mono break-all"
                  placeholder="$2a$10$..."
                />
              </div>

              <div className="relative flex items-center justify-between bg-black/60 rounded-xl p-6 border border-white/5 mt-auto">
                <span className="text-sm font-bold text-gray-400">Match Status</span>
                
                {isVerifying ? (
                  <Badge variant="info" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-4 py-1.5 animate-pulse">Verifying...</Badge>
                ) : isMatch === null ? (
                  <Badge variant="info" className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-sm px-4 py-1.5">Waiting for input</Badge>
                ) : isMatch === true ? (
                  <Badge variant="success" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-sm px-4 py-1.5">True — Hashes Match</Badge>
                ) : (
                  <Badge variant="error" className="bg-red-500/20 text-red-400 border-red-500/30 text-sm px-4 py-1.5">False — No Match</Badge>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { IdType, generateIds, decodeId, DecodedId } from "@/utils/idUtils";

export default function IdGeneratorPage() {
  const [idType, setIdType] = useState<IdType>("uuidv4");
  const [count, setCount] = useState(10);
  const [generatedIds, setGeneratedIds] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [decoderInput, setDecoderInput] = useState("");
  const [decodedInfo, setDecodedInfo] = useState<DecodedId | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Slight timeout to allow UI to show "Generating..." if 10k is selected
    setTimeout(() => {
      const ids = generateIds(idType, count);
      setGeneratedIds(ids.join("\n"));
      setIsGenerating(false);
    }, 50);
  };

  // Auto-generate on load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!decoderInput) {
      setDecodedInfo(null);
      return;
    }
    setDecodedInfo(decodeId(decoderInput));
  }, [decoderInput]);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="info" className="mb-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Offline Bulk Generator</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Advanced ID Generator
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Generate thousands of secure UUIDs or ULIDs instantly. Paste time-sortable IDs to mathematically decode their exact creation timestamps.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Generator */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              Bulk Generator
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden h-[500px]">
              {/* Controls */}
              <div className="p-6 border-b border-white/10 bg-black/20 flex flex-col gap-4">
                <div className="flex gap-2">
                  {(['uuidv4', 'uuidv7', 'ulid'] as IdType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setIdType(type)}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors border ${
                        idType === type 
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' 
                          : 'bg-black/40 text-gray-400 border-white/10 hover:bg-white/5'
                      }`}
                    >
                      {type === 'uuidv4' ? 'UUID v4' : type === 'uuidv7' ? 'UUID v7' : 'ULID'}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-400">Quantity</label>
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{count.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="10000"
                    step="1"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : `Generate ${count.toLocaleString()} IDs`}
                </button>
              </div>

              {/* Output */}
              <div className="flex-1 flex flex-col relative group bg-black/40 p-4">
                <textarea 
                  readOnly
                  value={generatedIds}
                  className="flex-1 w-full bg-black/60 border border-white/5 rounded-xl p-4 text-indigo-300 font-mono text-sm resize-none focus:outline-none focus:border-indigo-500/50 relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Decoder */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Timestamp Decoder
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col h-[500px] overflow-hidden">
              
              {/* Input Pane */}
              <div className="p-6 border-b border-white/10 bg-black/20 flex flex-col">
                <span className="text-sm font-bold text-gray-400 mb-2">Paste UUIDv7 or ULID</span>
                <input 
                  type="text"
                  value={decoderInput}
                  onChange={(e) => setDecoderInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/5 rounded-xl p-4 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-500/50"
                  placeholder="01ARZ3NDEKTSV4RRFFQ69G5FAV"
                />
              </div>

              {/* Output Pane */}
              <div className="flex-1 flex flex-col p-6 relative group bg-black/40 overflow-hidden">
                <div className="pointer-events-none absolute left-[-20%] bottom-[-20%] h-[80%] w-[80%] rounded-full bg-teal-500/5 blur-[80px] transition-all group-hover:bg-teal-500/10" />
                
                <span className="text-sm font-bold text-gray-400 mb-4 relative">Decoded Timestamp</span>
                
                <div className="flex-1 flex flex-col gap-4 relative">
                  {!decoderInput ? (
                    <div className="flex-1 border border-white/5 bg-black/60 rounded-xl flex items-center justify-center">
                      <div className="text-sm text-gray-600">Waiting for input...</div>
                    </div>
                  ) : decodedInfo?.isValid && decodedInfo.timestamp ? (
                    <>
                      <div className="bg-black/60 border border-teal-500/30 rounded-xl p-4">
                        <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">Format Detected</label>
                        <div className="text-teal-300 font-bold">{decodedInfo.type}</div>
                      </div>
                      <div className="bg-black/60 border border-teal-500/30 rounded-xl p-4">
                        <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">Local Time</label>
                        <div className="text-white text-lg">{decodedInfo.date?.toLocaleString()}</div>
                      </div>
                      <div className="bg-black/60 border border-teal-500/30 rounded-xl p-4">
                        <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">UTC Time</label>
                        <div className="text-gray-300">{decodedInfo.date?.toISOString()}</div>
                      </div>
                      <div className="bg-black/60 border border-teal-500/30 rounded-xl p-4">
                        <label className="text-xs font-bold text-gray-500 block mb-1 uppercase">Unix Epoch (ms)</label>
                        <div className="text-teal-300 font-mono">{decodedInfo.timestamp}</div>
                      </div>
                    </>
                  ) : decodedInfo?.isValid && decodedInfo.type === 'Unknown/NotTimeSortable' ? (
                     <div className="flex-1 border border-yellow-500/20 bg-yellow-500/5 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 mb-3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                      <div className="text-yellow-300 font-bold mb-1">No Timestamp Found</div>
                      <div className="text-sm text-yellow-300/70">{decodedInfo.error}</div>
                    </div>
                  ) : (
                    <div className="flex-1 border border-red-500/20 bg-red-500/5 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mb-3"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                      <div className="text-red-300 font-bold mb-1">Invalid ID Format</div>
                      <div className="text-sm text-red-300/70">{decodedInfo?.error}</div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

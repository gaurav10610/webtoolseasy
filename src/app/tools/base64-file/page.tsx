"use client";

import { useState, useRef, ChangeEvent } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { encodeFileToBase64, isLikelyBase64Image } from "@/utils/base64Utils";

export default function Base64FilePage() {
  const [base64Output, setBase64Output] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  
  const [decodeInput, setDecodeInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setFileSize(file.size);
    
    try {
      const b64 = await encodeFileToBase64(file);
      setBase64Output(b64);
    } catch (err) {
      setBase64Output("Error reading file.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setFileSize(file.size);
    
    try {
      const b64 = await encodeFileToBase64(file);
      setBase64Output(b64);
    } catch (err) {
      setBase64Output("Error reading file.");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="info" className="mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20">Offline File Encoding</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            Base64 File Encoder
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Convert images and files to Base64 strings, or preview Base64 data URIs instantly. Processing happens entirely in your browser.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: File to Base64 */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg>
              Encode File to Base64
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden h-[500px]">
              {/* Dropzone */}
              <div 
                className="p-6 border-b border-white/10 bg-black/20"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div 
                  className="border-2 border-dashed border-blue-500/30 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-500/5 transition-colors text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden"
                  />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <p className="text-white font-bold mb-1">Click or drag a file here</p>
                  <p className="text-xs text-gray-500">Supports images, fonts, docs, and any binary file.</p>
                </div>
              </div>

              {/* Output Pane */}
              <div className="flex-1 flex flex-col p-6 relative group bg-black/40">
                <div className="pointer-events-none absolute right-[-20%] bottom-[-20%] h-[80%] w-[80%] rounded-full bg-blue-500/5 blur-[80px] transition-all group-hover:bg-blue-500/10" />
                
                <div className="flex justify-between items-center mb-4 relative">
                  <span className="text-sm font-bold text-gray-400">Base64 Output</span>
                  {fileName && (
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                      {fileName} ({formatSize(fileSize)})
                    </span>
                  )}
                </div>
                
                <textarea 
                  readOnly
                  value={base64Output}
                  className="flex-1 w-full bg-black/60 border border-white/5 rounded-xl p-4 text-blue-300 font-mono text-xs resize-none focus:outline-none focus:border-blue-500/50 break-all relative"
                  placeholder="Data URI will appear here..."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Base64 to File */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Decode Base64 & Preview
            </h2>
            
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col h-[500px] overflow-hidden">
              
              {/* Input Pane */}
              <div className="p-6 border-b border-white/10 bg-black/20 h-1/2 flex flex-col">
                <span className="text-sm font-bold text-gray-400 mb-4">Paste Data URI or Base64</span>
                <textarea 
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  className="flex-1 w-full bg-black/60 border border-white/5 rounded-xl p-4 text-purple-300 font-mono text-xs resize-none focus:outline-none focus:border-purple-500/50 break-all"
                  placeholder="data:image/png;base64,iVBORw0KGgo..."
                />
              </div>

              {/* Preview Pane */}
              <div className="flex-1 flex flex-col p-6 relative group bg-black/40 overflow-hidden">
                <div className="pointer-events-none absolute left-[-20%] bottom-[-20%] h-[80%] w-[80%] rounded-full bg-purple-500/5 blur-[80px] transition-all group-hover:bg-purple-500/10" />
                
                <span className="text-sm font-bold text-gray-400 mb-4 relative">Preview</span>
                
                <div className="flex-1 border border-white/5 bg-black/60 rounded-xl overflow-hidden flex items-center justify-center relative">
                  {decodeInput ? (
                    isLikelyBase64Image(decodeInput) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={decodeInput} 
                        alt="Base64 Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-sm text-purple-400/50 text-center px-4 font-mono">
                        Valid image Data URI not detected.<br/>
                        Ensure it starts with <br/><span className="text-purple-400">data:image/...</span>
                      </div>
                    )
                  ) : (
                    <div className="text-sm text-gray-600">Waiting for input...</div>
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

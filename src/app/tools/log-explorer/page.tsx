"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function LogExplorerPage() {
  const [isReady, setIsReady] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [totalLines, setTotalLines] = useState<number>(0);
  const [isImporting, setIsImporting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const callbacks = useRef<Record<string, { resolve: Function, reject: Function }>>({});
  
  // The complete array of string lines (kept in main thread for instant synchronous access by the virtualizer)
  const linesRef = useRef<string[]>([]);
  
  // The currently filtered indices (if null, show all lines)
  const [filteredIndices, setFilteredIndices] = useState<Uint32Array | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  // Virtualizer for the list
  const count = filteredIndices ? filteredIndices.length : totalLines;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24, // Estimate 24px per line
    overscan: 20, // Render 20 items outside of visible viewport
  });

  useEffect(() => {
    // Initialize Worker
    workerRef.current = new Worker(new URL('../../../workers/log.worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { type, data, error: errMsg, id } = e.data;
      
      if (type === 'ERROR' && !id) {
        setError(errMsg);
      } else if (id && callbacks.current[id]) {
        if (type === 'SUCCESS') {
          callbacks.current[id].resolve(data);
        } else {
          callbacks.current[id].reject(new Error(errMsg));
        }
        delete callbacks.current[id];
      }
    };

    setIsReady(true);

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const executeCommand = useCallback((type: string, payload: any = {}): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) return reject(new Error('Worker not initialized'));
      
      const id = Math.random().toString(36).substring(7);
      callbacks.current[id] = { resolve, reject };
      workerRef.current.postMessage({ type, payload, id });
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);
    setFileName(file.name);
    setFileSize(file.size);
    setSearchQuery("");
    setFilteredIndices(null);

    try {
      const text = await file.text();
      
      // Split locally for instant UI render
      linesRef.current = text.split(/\r?\n/);
      setTotalLines(linesRef.current.length);
      
      // Send text to worker for future searches
      await executeCommand('LOAD_FILE', { text });
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImporting(false);
      if (e.target) e.target.value = '';
    }
  };

  const loadExampleData = async () => {
    setIsImporting(true);
    setError(null);
    setFileName('example_server.log');
    setFileSize(1024 * 50); // fake size
    setSearchQuery("");
    setFilteredIndices(null);

    try {
      // Generate 100,000 dummy log lines
      const dummyLines = [];
      const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
      const messages = [
        'User authentication successful',
        'Failed to connect to database',
        'Request timeout on /api/data',
        'Memory threshold exceeded',
        'Cache miss for key user_123',
        'Payment processed successfully',
      ];
      
      for (let i = 0; i < 100000; i++) {
        const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
        const level = levels[Math.floor(Math.random() * levels.length)];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const ms = Math.floor(Math.random() * 500);
        dummyLines.push(`[${date}] [${level}] ${msg} - ${ms}ms`);
      }
      
      const text = dummyLines.join('\n');
      linesRef.current = dummyLines;
      setTotalLines(dummyLines.length);
      
      await executeCommand('LOAD_FILE', { text });
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // Perform search in the worker
  useEffect(() => {
    if (!fileName || !isReady) return;

    const performSearch = async () => {
      setIsSearching(true);
      setError(null);
      try {
        const result = await executeCommand('SEARCH', { 
          query: searchQuery,
          useRegex,
          matchCase
        });
        
        // result.indices is a Uint32Array transferred from the worker
        setFilteredIndices(result.indices);
        // Reset scroll position
        virtualizer.scrollToOffset(0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceId = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceId);
  }, [searchQuery, useRegex, matchCase, fileName, isReady]);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1600px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)] h-screen overflow-hidden">
        
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="warning" className="mb-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">React Virtualized</Badge>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight flex-1">
              Big Data Log Explorer
            </h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Instantly view and search millions of lines in massive log files (JSONL, TXT) without crashing your browser.
            Powered by Web Workers for blazing-fast regex filtering and zero UI freezing.
          </p>
        </div>

        <div className="flex-1 bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-0 shadow-xl relative group">
          <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[50%] w-[50%] rounded-full bg-yellow-500/5 blur-[80px] transition-all group-hover:bg-yellow-500/10" />
          
          {/* Header & Controls */}
          <div className="p-4 border-b border-white/10 bg-black/40 flex flex-col md:flex-row justify-between items-center z-10 shrink-0 gap-4">
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {!fileName ? (
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <label className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-bold rounded-lg cursor-pointer transition-colors shadow-lg shadow-yellow-500/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    {isImporting ? 'Loading...' : 'Open File (.log, .jsonl, .txt)'}
                    <input type="file" accept=".log,.jsonl,.txt,.csv" className="hidden" onChange={handleFileUpload} disabled={!isReady || isImporting} />
                  </label>
                  <button 
                    onClick={loadExampleData}
                    disabled={!isReady || isImporting}
                    className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                  >
                    100k Lines Example
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      {fileName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {fileSize ? `${(fileSize / 1024 / 1024).toFixed(2)} MB` : 'Example Data'} • {totalLines.toLocaleString()} lines
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setFileName(null);
                      setTotalLines(0);
                      linesRef.current = [];
                      setFilteredIndices(null);
                      setSearchQuery("");
                      executeCommand('CLEAR');
                    }}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Close file"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isSearching ? (
                    <svg className="animate-spin h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={!fileName}
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 disabled:opacity-50"
                />
              </div>
              
              <div className="flex bg-black/50 border border-white/10 rounded-lg p-1 overflow-hidden">
                <button
                  onClick={() => setMatchCase(!matchCase)}
                  disabled={!fileName}
                  title="Match Case"
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors disabled:opacity-50 ${matchCase ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-500 hover:text-white'}`}
                >
                  Aa
                </button>
                <button
                  onClick={() => setUseRegex(!useRegex)}
                  disabled={!fileName}
                  title="Use Regular Expression"
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors disabled:opacity-50 ${useRegex ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-500 hover:text-white'}`}
                >
                  .*
                </button>
              </div>
            </div>
            
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center justify-between shrink-0">
              <span className="text-sm font-mono text-red-400 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {error}
              </span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}

          {/* Meta Info */}
          {fileName && (
            <div className="px-4 py-1.5 bg-white/5 border-b border-white/5 flex items-center gap-4 shrink-0 text-[11px] text-gray-500 font-mono">
              <span>Showing: <strong className="text-gray-300">{count.toLocaleString()}</strong> rows</span>
              {searchQuery && (
                <span>Filtered out: <strong className="text-gray-300">{(totalLines - count).toLocaleString()}</strong> rows</span>
              )}
            </div>
          )}

          {/* Virtualized Log Area */}
          <div 
            ref={parentRef}
            className="flex-1 overflow-auto bg-black/20 p-0 relative font-mono text-[13px] leading-[24px]"
          >
            {!fileName ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-700"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <div className="text-center">
                  <p>Drop a .log or .jsonl file to begin.</p>
                  <p className="text-xs text-gray-600 mt-2">Processes millions of lines instantly without server uploads.</p>
                </div>
              </div>
            ) : count === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                No matches found for "{searchQuery}".
              </div>
            ) : (
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const originalIndex = filteredIndices ? filteredIndices[virtualItem.index] : virtualItem.index;
                  const text = linesRef.current[originalIndex];
                  
                  // Simple syntax highlighting heuristic
                  let colorClass = "text-gray-300";
                  if (text.includes("ERROR") || text.includes("Exception") || text.includes("Fail")) colorClass = "text-red-400 font-bold";
                  else if (text.includes("WARN")) colorClass = "text-yellow-400";
                  else if (text.includes("INFO")) colorClass = "text-emerald-400";
                  else if (text.includes("DEBUG")) colorClass = "text-blue-400";

                  return (
                    <div
                      key={virtualItem.key}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      className="flex px-4 hover:bg-white/5 group border-b border-white/[0.02]"
                    >
                      <div className="w-16 shrink-0 text-gray-600 select-none text-right pr-4 border-r border-white/5 mr-4 font-mono text-[11px] flex flex-col justify-center">
                        {originalIndex + 1}
                      </div>
                      <div className={`flex-1 whitespace-pre truncate ${colorClass}`}>
                        {text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

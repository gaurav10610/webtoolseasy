"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import Editor from "@monaco-editor/react";

// Types for SQL.js results
type SqlResult = {
  columns: string[];
  values: any[][];
};

export default function SqliteStudioPage() {
  const [workerReady, setWorkerReady] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [query, setQuery] = useState("SELECT 'Hello World' as greeting;");
  const [results, setResults] = useState<SqlResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  
  const workerRef = useRef<Worker | null>(null);
  const callbacks = useRef<Record<string, { resolve: Function, reject: Function }>>({});

  useEffect(() => {
    // Initialize Worker
    workerRef.current = new Worker(new URL('../../../workers/sqlite.worker.ts', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { type, data, error, id } = e.data;
      
      if (type === 'READY') {
        setWorkerReady(true);
      } else if (type === 'ERROR' && !id) {
        setError(error);
        setWorkerReady(false);
      } else if (id && callbacks.current[id]) {
        if (type === 'SUCCESS') {
          callbacks.current[id].resolve(data);
        } else {
          callbacks.current[id].reject(new Error(error));
        }
        delete callbacks.current[id];
      }
    };

    workerRef.current.postMessage({ type: 'INIT' });

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

  const refreshTables = async () => {
    try {
      const res = await executeCommand('GET_TABLES');
      if (res && res.length > 0) {
        setTables(res[0].values.map((v: any) => v[0]));
      } else {
        setTables([]);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleRunQuery = async () => {
    if (!query.trim()) return;
    
    setIsExecuting(true);
    setError(null);
    setResults([]);
    
    try {
      const res = await executeCommand('EXEC', { sql: query });
      setResults(res || []);
      
      // If the query was a schema modification, refresh tables
      if (query.toUpperCase().includes('CREATE') || query.toUpperCase().includes('DROP')) {
        await refreshTables();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        // Strip extension for table name
        let tableName = file.name.replace(/\.[^/.]+$/, "");
        
        await executeCommand('IMPORT_CSV', { 
          csvText: text,
          tableName 
        });
        
        await refreshTables();
        
        // Auto query the new table
        const newQuery = `SELECT * FROM "${tableName.replace(/[^a-zA-Z0-9_]/g, '_')}" LIMIT 100;`;
        setQuery(newQuery);
        
        // Execute immediately
        const res = await executeCommand('EXEC', { sql: newQuery });
        setResults(res || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsImporting(false);
        // Reset file input
        if (e.target) e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const loadExampleData = async () => {
    const exampleCsv = `id,name,email,role,status,last_login
1,Alice Smith,alice@example.com,admin,active,2023-10-01
2,Bob Johnson,bob@example.com,user,active,2023-10-05
3,Charlie Brown,charlie@example.com,user,inactive,2023-09-15
4,Diana Prince,diana@example.com,manager,active,2023-10-10
5,Evan Wright,evan@example.com,user,pending,2023-10-12`;

    setIsImporting(true);
    setError(null);
    try {
      await executeCommand('IMPORT_CSV', { 
        csvText: exampleCsv,
        tableName: 'users' 
      });
      await refreshTables();
      setQuery(`SELECT * FROM users WHERE status = 'active';`);
      const res = await executeCommand('EXEC', { sql: `SELECT * FROM users WHERE status = 'active';` });
      setResults(res || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1600px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)] h-screen overflow-hidden">
        
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="error" className="mb-2 bg-purple-500/10 text-purple-400 border-purple-500/20">WASM Data Studio</Badge>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight flex-1">
              In-Browser SQLite Studio
            </h1>
            {!workerReady && (
              <span className="text-sm font-bold text-yellow-500 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                Initializing WASM...
              </span>
            )}
          </div>
          <p className="text-gray-400 max-w-3xl">
            Drop massive CSVs and instantly query them locally using SQL. Powered by SQLite running entirely in a Web Worker, ensuring zero server uploads and zero UI freezing.
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Column: Schema & Import */}
          <div className="lg:col-span-3 bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Database Schema</span>
            </div>
            
            <div className="p-4 border-b border-white/10 bg-purple-500/5 shrink-0 flex flex-col gap-3">
              <label className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-500/30 rounded-xl cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400 mb-2 group-hover:scale-110 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span className="text-sm font-bold text-purple-300">Import CSV to Table</span>
                <span className="text-xs text-gray-500 mt-1">Processed instantly locally</span>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={!workerReady || isImporting} />
              </label>
              
              <button 
                onClick={loadExampleData}
                disabled={!workerReady || isImporting}
                className="w-full py-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
              >
                Load Example Data
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {tables.length === 0 ? (
                <div className="text-center text-gray-500 text-sm mt-10">
                  No tables exist yet.<br/>Import a CSV or run a CREATE statement.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {tables.map(table => (
                    <div key={table} className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400 shrink-0"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                      <span className="text-sm text-gray-300 font-mono truncate">{table}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: SQL Editor & Results */}
          <div className="lg:col-span-9 flex flex-col gap-6 min-h-0">
            
            {/* SQL Editor Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden h-64 shrink-0 shadow-xl relative group">
              <div className="pointer-events-none absolute right-[-5%] top-[-20%] h-[100%] w-[50%] rounded-full bg-purple-500/5 blur-[80px] transition-all group-hover:bg-purple-500/10" />
              
              <div className="p-3 border-b border-white/10 bg-black/40 flex justify-between items-center z-10 shrink-0">
                <span className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                  SQL Editor
                </span>
                <button 
                  onClick={handleRunQuery}
                  disabled={!workerReady || isExecuting || isImporting || !query.trim()}
                  className="px-4 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold rounded shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                >
                  {isExecuting ? 'Executing...' : 'Run Query (Cmd+Enter)'}
                </button>
              </div>
              
              <div className="flex-1 w-full bg-black/40 relative z-10" onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleRunQuery();
                }
              }}>
                <Editor
                  height="100%"
                  language="sql"
                  theme="vs-dark"
                  value={query}
                  onChange={(val) => setQuery(val || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    fontFamily: 'var(--font-geist-mono)',
                    lineHeight: 1.6,
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true
                  }}
                />
              </div>
            </div>

            {/* Results Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden flex-1 min-h-0 shadow-xl">
              <div className="p-3 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
                <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Results</span>
                {results.length > 0 && results[0].values && (
                  <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    {results[0].values.length} rows returned
                  </Badge>
                )}
              </div>
              
              <div className="flex-1 overflow-auto bg-black/20 p-0 relative">
                {error && (
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-red-500/5">
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-mono flex flex-col items-center gap-3 text-center max-w-2xl">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <div className="whitespace-pre-wrap">{error}</div>
                    </div>
                  </div>
                )}
                
                {!error && results.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    {isExecuting ? 'Running query...' : 'Execute a query to see results here.'}
                  </div>
                )}

                {!error && results.map((result, idx) => (
                  <div key={idx} className="w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-black/40 sticky top-0 shadow-sm shadow-black/50 z-10">
                        <tr>
                          {result.columns.map((col, i) => (
                            <th key={i} className="px-4 py-3 font-bold text-gray-400 border-b border-white/10 border-r border-white/5 last:border-r-0">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {result.values.map((row, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                            {row.map((val, j) => (
                              <td key={j} className="px-4 py-2 text-gray-300 font-mono text-xs border-r border-white/5 last:border-r-0 max-w-xs truncate" title={String(val)}>
                                {val === null ? <span className="text-gray-600 italic">null</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import Editor from "@monaco-editor/react";

type KeyValue = { id: string; key: string; value: string; enabled: boolean };
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default function ApiTesterPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: "1", key: "Accept", value: "application/json", enabled: true }
  ]);
  const [queryParams, setQueryParams] = useState<KeyValue[]>([]);
  const [requestBody, setRequestBody] = useState("{\n  \n}");
  
  const [activeReqTab, setActiveReqTab] = useState<"params" | "headers" | "body">("params");
  
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    timeMs: number;
    sizeBytes: number;
    headers: Record<string, string>;
    body: string;
    error: string | null;
  } | null>(null);

  const [activeResTab, setActiveResTab] = useState<"body" | "headers">("body");

  const updateKeyValue = (setter: React.Dispatch<React.SetStateAction<KeyValue[]>>, id: string, field: "key" | "value" | "enabled", val: any) => {
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const addKeyValue = (setter: React.Dispatch<React.SetStateAction<KeyValue[]>>) => {
    setter(prev => [...prev, { id: Math.random().toString(), key: "", value: "", enabled: true }]);
  };

  const removeKeyValue = (setter: React.Dispatch<React.SetStateAction<KeyValue[]>>, id: string) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const handleSend = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    
    // Construct final URL with query params
    let finalUrl = url;
    const activeParams = queryParams.filter(p => p.enabled && p.key);
    if (activeParams.length > 0) {
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
        activeParams.forEach(p => urlObj.searchParams.append(p.key, p.value));
        finalUrl = urlObj.toString();
      } catch (e) {
        // If URL parsing fails, just fallback
      }
    }

    // Construct headers
    const reqHeaders: Record<string, string> = {};
    headers.filter(h => h.enabled && h.key).forEach(h => {
      reqHeaders[h.key] = h.value;
    });

    const startTime = performance.now();
    
    try {
      const options: RequestInit = {
        method,
        headers: reqHeaders,
      };
      
      if (method !== "GET" && requestBody.trim()) {
        options.body = requestBody;
        if (!reqHeaders["Content-Type"]) {
          reqHeaders["Content-Type"] = "application/json";
        }
      }

      const res = await fetch(finalUrl, options);
      const endTime = performance.now();
      
      const resHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        resHeaders[key] = value;
      });

      const text = await res.text();
      let formattedBody = text;
      
      // Try to format JSON beautifully
      if (resHeaders["content-type"]?.includes("application/json")) {
        try {
          formattedBody = JSON.stringify(JSON.parse(text), null, 2);
        } catch (e) {}
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        timeMs: Math.round(endTime - startTime),
        sizeBytes: new Blob([text]).size,
        headers: resHeaders,
        body: formattedBody,
        error: null
      });

    } catch (err: any) {
      const endTime = performance.now();
      setResponse({
        status: 0,
        statusText: "Error",
        timeMs: Math.round(endTime - startTime),
        sizeBytes: 0,
        headers: {},
        body: "",
        error: err.message || "Failed to fetch. CORS issue or network offline."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400";
    if (status >= 300 && status < 400) return "text-blue-400";
    if (status >= 400 && status < 500) return "text-orange-400";
    if (status >= 500) return "text-red-400";
    return "text-gray-400";
  };

  const renderKeyValueList = (items: KeyValue[], setter: React.Dispatch<React.SetStateAction<KeyValue[]>>) => (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.enabled}
            onChange={(e) => updateKeyValue(setter, item.id, "enabled", e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500/50"
          />
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateKeyValue(setter, item.id, "key", e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateKeyValue(setter, item.id, "value", e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={() => removeKeyValue(setter, item.id)}
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      ))}
      <button
        onClick={() => addKeyValue(setter)}
        className="mt-2 text-xs font-bold text-gray-400 hover:text-white self-start flex items-center gap-1 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add Row
      </button>
    </div>
  );

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1600px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)] h-screen overflow-hidden">
        
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="info" className="mb-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Local Network</Badge>
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight flex-1">
              API & Network Sandbox
            </h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Test and explore APIs entirely locally. No backend servers required. Securely test your localhost endpoints or internal company APIs without exposing your auth tokens.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          
          {/* Top Bar: URL & Send */}
          <div className="flex gap-2 shrink-0">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className="bg-[#121214] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-indigo-400 focus:outline-none focus:border-indigo-500/50 appearance-none min-w-[100px] text-center"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            
            <input
              type="text"
              placeholder="Enter request URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-[#121214] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 font-mono"
            />
            
            <button
              onClick={handleSend}
              disabled={isLoading || !url.trim()}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
                  Sending
                </>
              ) : (
                <>
                  Send
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </>
              )}
            </button>
          </div>

          <div className="flex-1 grid lg:grid-cols-2 gap-4 min-h-0">
            {/* Request Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-0 relative shadow-xl">
              <div className="flex border-b border-white/10 bg-black/40 shrink-0 px-2 pt-2 gap-1">
                {[
                  { id: "params", label: "Query Params", count: queryParams.filter(p => p.key).length },
                  { id: "headers", label: "Headers", count: headers.filter(h => h.key).length },
                  { id: "body", label: "Body" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveReqTab(tab.id as any)}
                    className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
                      activeReqTab === tab.id 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${activeReqTab === tab.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/10 text-gray-400'}`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex-1 overflow-auto bg-black/20 p-4 relative">
                {activeReqTab === "params" && renderKeyValueList(queryParams, setQueryParams)}
                {activeReqTab === "headers" && renderKeyValueList(headers, setHeaders)}
                {activeReqTab === "body" && (
                  <div className="absolute inset-0">
                    <Editor
                      height="100%"
                      language="json"
                      theme="vs-dark"
                      value={requestBody}
                      onChange={(val) => setRequestBody(val || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        fontFamily: 'var(--font-geist-mono)',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Response Pane */}
            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden min-h-0 relative shadow-xl group">
              <div className="pointer-events-none absolute left-[20%] top-[20%] h-[50%] w-[50%] rounded-full bg-indigo-500/5 blur-[80px] transition-all group-hover:bg-indigo-500/10" />
              
              <div className="flex border-b border-white/10 bg-black/40 shrink-0 justify-between items-end px-2 pt-2">
                <div className="flex gap-1">
                  {[
                    { id: "body", label: "Response Body" },
                    { id: "headers", label: "Headers", count: response ? Object.keys(response.headers).length : 0 }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveResTab(tab.id as any)}
                      className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-2 ${
                        activeResTab === tab.id 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${activeResTab === tab.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/10 text-gray-400'}`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {response && (
                  <div className="flex gap-4 pb-2 pr-2 text-xs font-mono">
                    <span className="flex gap-1 items-center">
                      <span className="text-gray-500">Status:</span>
                      <span className={`font-bold ${getStatusColor(response.status)}`}>
                        {response.status === 0 ? "ERROR" : `${response.status} ${response.statusText}`}
                      </span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <span className="text-gray-500">Time:</span>
                      <span className="text-emerald-400 font-bold">{response.timeMs} ms</span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-blue-400 font-bold">{(response.sizeBytes / 1024).toFixed(2)} KB</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-auto bg-black/20 p-0 relative">
                {!response && !isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-700"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    <div className="text-center">
                      <p>Enter a URL and click Send to get a response.</p>
                    </div>
                  </div>
                )}

                {response?.error && (
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-red-500/5">
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-mono flex flex-col items-center gap-3 text-center max-w-2xl">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <div className="whitespace-pre-wrap">{response.error}</div>
                      <p className="text-xs text-red-400/70 mt-2">
                        If testing a cross-origin API, ensure the server sends appropriate CORS headers.
                      </p>
                    </div>
                  </div>
                )}

                {response && !response.error && activeResTab === "body" && (
                  <div className="absolute inset-0 z-10">
                    <Editor
                      height="100%"
                      language={response.headers["content-type"]?.includes("json") ? "json" : "html"}
                      theme="vs-dark"
                      value={response.body}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        fontFamily: 'var(--font-geist-mono)',
                      }}
                    />
                  </div>
                )}
                
                {response && !response.error && activeResTab === "headers" && (
                  <div className="p-4">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <tbody className="divide-y divide-white/5 border border-white/5 rounded-lg overflow-hidden block w-full">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <tr key={key} className="hover:bg-white/5 transition-colors flex w-full">
                            <td className="px-4 py-2 font-bold text-gray-400 border-r border-white/5 w-1/3 truncate">{key}</td>
                            <td className="px-4 py-2 text-gray-300 font-mono text-xs truncate w-2/3" title={value}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

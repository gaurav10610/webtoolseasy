"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { formatSql, SqlFormatterOptions, KeywordCase } from "@/utils/sqlUtils";
import { SqlLanguage } from "sql-formatter";

export default function SqlFormatterPage() {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Options
  const [dialect, setDialect] = useState<SqlLanguage>("postgresql");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [tabWidth, setTabWidth] = useState(2);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const options: SqlFormatterOptions = {
      dialect,
      keywordCase,
      tabWidth,
      useTabs: false,
      linesBetweenQueries: 2
    };
    
    const result = formatSql(inputSql, options);
    setOutputSql(result.formattedSql);
    setError(result.error || null);
  }, [inputSql, dialect, keywordCase, tabWidth]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClear = () => {
    setInputSql("");
    setOutputSql("");
    setError(null);
  };

  const loadExample = () => {
    setInputSql("select id, name, created_at from users where status='active' group by id having count(id)>1 order by created_at desc limit 10; insert into logs(msg) values('loaded example');");
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-8 flex flex-col justify-start items-start gap-2">
          <Badge variant="warning" className="mb-2 bg-orange-500/10 text-orange-400 border-orange-500/20">AST Parser</Badge>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            SQL Formatter & Validator
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Beautify complex SQL queries and validate syntax locally. Your sensitive database queries are formatted securely in the browser using AST parsing.
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl flex flex-col md:flex-row p-4 gap-6 mb-6 items-center z-10 relative">
          
          <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dialect</label>
              <select 
                value={dialect}
                onChange={(e) => setDialect(e.target.value as SqlLanguage)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 appearance-none"
              >
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mariadb">MariaDB</option>
                <option value="sql">Standard SQL</option>
                <option value="tsql">T-SQL (SQL Server)</option>
                <option value="sqlite">SQLite</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Keyword Case</label>
              <select 
                value={keywordCase}
                onChange={(e) => setKeywordCase(e.target.value as KeywordCase)}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 appearance-none"
              >
                <option value="upper">UPPERCASE</option>
                <option value="lower">lowercase</option>
                <option value="preserve">Preserve Original</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tab Width</label>
              <select 
                value={tabWidth}
                onChange={(e) => setTabWidth(parseInt(e.target.value))}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50 appearance-none"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="8">8 Spaces</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 justify-end">
              <button 
                onClick={loadExample}
                className="w-full py-2 text-sm font-bold bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors border border-white/10"
              >
                Load Example
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-mono flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div className="whitespace-pre-wrap">{error}</div>
          </div>
        )}

        <div className="flex-1 grid lg:grid-cols-2 gap-6 h-[600px]">
          
          {/* Input Pane */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative">
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10">
              <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Raw SQL</span>
              <button 
                onClick={handleClear}
                className="text-xs text-gray-500 hover:text-red-400 font-bold transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea 
              value={inputSql}
              onChange={(e) => setInputSql(e.target.value)}
              placeholder="Paste your minified or unreadable SQL query here..."
              className="flex-1 w-full bg-transparent p-6 text-orange-100/70 font-mono text-sm resize-none focus:outline-none z-10"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative group">
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-orange-500/10 blur-[80px] transition-all group-hover:bg-orange-500/20" />
            <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10">
              <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">Formatted Output</span>
              <button 
                onClick={copyToClipboard}
                disabled={!outputSql}
                className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-bold rounded transition-colors border border-orange-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <textarea 
              readOnly
              value={outputSql}
              placeholder={inputSql ? "Syntax error occurred..." : "Formatted SQL will appear here..."}
              className={`flex-1 w-full bg-transparent p-6 font-mono text-sm resize-none focus:outline-none z-10 ${error ? 'text-red-300/50' : 'text-orange-300'}`}
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

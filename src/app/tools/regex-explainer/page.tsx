"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { parseRegexExplanation, evaluateRegexMatches, RegexExplanationNode } from "@/utils/regexParser";

const DEFAULT_REGEX = "/^(?<domain>[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$/im";
const DEFAULT_TEST_STRING = "example.com\nmy-test-domain.org\ninvalid_domain.com\nsub.domain.co.uk";

function AstNode({ node, depth = 0 }: { node: RegexExplanationNode, depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`mt-2 ${depth > 0 ? "ml-4 border-l border-white/10 pl-4" : ""}`}>
      <div 
        className={`flex flex-col p-3 rounded-xl border border-white/5 transition-colors ${hasChildren ? "cursor-pointer hover:bg-white/5" : "bg-white/5"}`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-pink-400 font-mono">
            {node.type}
            {node.value && <span className="text-white ml-2 bg-black/50 px-2 py-0.5 rounded">'{node.value}'</span>}
          </span>
          {hasChildren && (
            <span className="text-gray-500 text-xs">
              {isExpanded ? "▼" : "▶"}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400">{node.description}</p>
      </div>
      
      {isExpanded && hasChildren && (
        <div className="mt-1">
          {node.children!.map((child, i) => (
            <AstNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RegexExplainerPage() {
  const [regexStr, setRegexStr] = useState<string>(DEFAULT_REGEX);
  const [testStr, setTestStr] = useState<string>(DEFAULT_TEST_STRING);
  
  const [ast, setAst] = useState<RegexExplanationNode | null>(null);
  const [matches, setMatches] = useState<{ match: string, index: number, groups: Record<string, string> }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regexStr.trim()) {
      setAst(null);
      setMatches(null);
      setError(null);
      return;
    }

    const { ast: parsedAst, error: parseError } = parseRegexExplanation(regexStr);
    
    if (parseError) {
      setError(parseError);
      setAst(null);
      setMatches(null);
    } else {
      setError(null);
      setAst(parsedAst || null);
      
      const evalMatches = evaluateRegexMatches(regexStr, testStr);
      setMatches(evalMatches);
    }
  }, [regexStr, testStr]);

  // Helper to highlight matches in the test string
  const renderHighlightedText = () => {
    if (!matches || matches.length === 0 || error) return <div className="text-gray-400 whitespace-pre-wrap">{testStr}</div>;

    let result = [];
    let lastIndex = 0;

    // Filter overlapping matches just in case
    const safeMatches = [...matches].sort((a, b) => a.index - b.index);

    for (let i = 0; i < safeMatches.length; i++) {
      const match = safeMatches[i];
      if (match.index >= lastIndex) {
        // Add text before match
        result.push(<span key={`text-${i}`}>{testStr.slice(lastIndex, match.index)}</span>);
        // Add highlighted match
        result.push(
          <span key={`match-${i}`} className="bg-pink-500/20 text-pink-300 px-0.5 rounded border border-pink-500/30">
            {match.match}
          </span>
        );
        lastIndex = match.index + match.match.length;
      }
    }
    // Add remaining text
    result.push(<span key="text-end">{testStr.slice(lastIndex)}</span>);

    return <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{result}</div>;
  };

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-screen">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/20">AST Parser</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Visual Regex Explainer
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Break down complex regular expressions into plain English using Abstract Syntax Trees.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl p-4 mb-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-300">Regular Expression</label>
              {error && <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">{error}</span>}
            </div>
            <input 
              type="text" 
              value={regexStr}
              onChange={(e) => setRegexStr(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-pink-300 font-mono focus:outline-none focus:ring-1 focus:ring-pink-500"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Left Pane: Explanation Tree */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden">
            <div className="bg-white/5 border-b border-white/10 px-4 py-3">
              <span className="text-sm font-bold text-gray-300">Explanation Tree</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {ast ? (
                <AstNode node={ast} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  {error ? "Fix syntax errors to view AST" : "Enter a regex to see explanation"}
                </div>
              )}
            </div>
          </div>

          {/* Right Pane: Test String & Matches */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden h-1/2">
               <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-300">Test String</span>
              </div>
              <textarea
                className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none"
                value={testStr}
                onChange={(e) => setTestStr(e.target.value)}
                placeholder="Enter test text here..."
                spellCheck="false"
              />
            </div>

            <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden h-1/2 relative">
               <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-bold text-pink-400">Match Results</span>
                <span className="text-xs bg-black/50 px-2 py-1 rounded text-gray-400">
                  {matches ? `${matches.length} match(es)` : '0 matches'}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-black/20">
                {renderHighlightedText()}
                
                {matches && matches.some(m => Object.keys(m.groups).length > 0) && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Captured Groups</h4>
                    <div className="space-y-2">
                      {matches.map((m, i) => Object.keys(m.groups).length > 0 ? (
                        <div key={i} className="bg-[#121214] border border-white/5 rounded-lg p-3">
                          <span className="text-xs text-gray-500 mb-2 block">Match {i + 1}:</span>
                          {Object.entries(m.groups).map(([name, val]) => (
                            <div key={name} className="flex items-center gap-2 text-sm font-mono mb-1 last:mb-0">
                              <span className="text-pink-400">{name}:</span>
                              <span className="text-gray-300 bg-black/50 px-1 rounded">"{val}"</span>
                            </div>
                          ))}
                        </div>
                      ) : null)}
                    </div>
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

"use client";

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import mermaid from "mermaid";
import "highlight.js/styles/github-dark.css";
import { Typography } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

// Initialize mermaid
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "inherit",
  });
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Render mermaid diagrams after component mounts
    if (mermaidRef.current) {
      const mermaidElements =
        mermaidRef.current.querySelectorAll(".language-mermaid");
      mermaidElements.forEach((element, index) => {
        const code = element.textContent || "";
        const id = `mermaid-${index}`;
        element.innerHTML = `<div class="mermaid" id="${id}">${code}</div>`;
      });
      mermaid.run();
    }
  }, [content]);

  return (
    <div ref={mermaidRef} className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography
              variant="body1"
              paragraph
              sx={{ lineHeight: 1.8, mb: 2 }}
            >
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#007AFF",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <Typography component="ul" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Typography>
          ),
          ol: ({ children }) => (
            <Typography component="ol" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Typography>
          ),
          li: ({ children }) => (
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              {children}
            </Typography>
          ),
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isMermaid = match && match[1] === "mermaid";

            if (isMermaid) {
              return (
                <pre className={`language-mermaid`}>
                  <code>{children}</code>
                </pre>
              );
            }

            // Inline code
            if (!className) {
              return (
                <code
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "0.9em",
                  }}
                >
                  {children}
                </code>
              );
            }

            // Code block
            return (
              <pre className={className}>
                <code>{children}</code>
              </pre>
            );
          },
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #007AFF",
                paddingLeft: "16px",
                marginLeft: 0,
                fontStyle: "italic",
                color: "#666",
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", marginBottom: "16px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                }}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#f5f5f5",
                textAlign: "left",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";
import { Typography } from "@mui/material";
import { MermaidDiagram } from "@/components/MermaidDiagram";

interface ServerMarkdownRendererProps {
  content: string;
}

export const ServerMarkdownRenderer: React.FC<ServerMarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div className="markdown-content">
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
            <ul
              style={{
                paddingLeft: "0",
                marginLeft: "24px",
                marginBottom: "16px",
                listStylePosition: "outside",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                paddingLeft: "0",
                marginLeft: "24px",
                marginBottom: "16px",
                listStylePosition: "outside",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              style={{
                marginBottom: "8px",
                lineHeight: "1.8",
                fontSize: "1rem",
              }}
            >
              <span style={{ display: "inline" }}>{children}</span>
            </li>
          ),
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isMermaid = match && match[1] === "mermaid";

            if (isMermaid) {
              // Use client component for mermaid diagrams
              const code = String(children).trim();
              return <MermaidDiagram code={code} />;
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

            // Code block - server-rendered
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
                marginRight: 0,
                color: "#666",
                fontStyle: "italic",
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
          thead: ({ children }) => (
            <thead style={{ backgroundColor: "#f5f5f5" }}>{children}</thead>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                fontWeight: 600,
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
          tr: ({ children }) => <tr>{children}</tr>,
          strong: ({ children }) => (
            <strong style={{ fontWeight: 600 }}>{children}</strong>
          ),
          em: ({ children }) => <em>{children}</em>,
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #ddd",
                margin: "32px 0",
              }}
            />
          ),
          img: ({ src, alt }) => (
            <span
              style={{
                display: "block",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || ""}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </span>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

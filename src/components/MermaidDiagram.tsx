"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
}

// Initialize mermaid
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "inherit",
  });
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!code) return;

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        setSvg(renderedSvg);
        setError("");
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
      }
    };

    renderDiagram();
  }, [code]);

  if (error) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      >
        <p style={{ margin: 0, color: "#c00" }}>{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      >
        <p style={{ margin: 0 }}>Loading diagram...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
      style={{
        marginBottom: "16px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        overflow: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

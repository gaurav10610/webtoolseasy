import { DescriptionBlock } from "@/types/description";
import Typography from "@mui/material/Typography";
import { isEmpty, isNil, map } from "lodash-es";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { AppNavigationConfig } from "@/types/config";
import { RelatedToolCard } from "./appCards";

export function AppHeading({
  heading,
}: Readonly<{
  heading: string;
}>) {
  return (
    <Typography
      variant="h1"
      className="text-center !text-2xl md:!text-4xl !font-normal"
    >
      {heading}
    </Typography>
  );
}

export function RelatedTools({
  relatedToolsConfigs,
}: Readonly<{
  relatedToolsConfigs: AppNavigationConfig[];
}>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="h2" fontSize={"inherit"}>
        Related Tools
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
        {map(relatedToolsConfigs, (relatedToolConfig) => (
          <div key={relatedToolConfig.applicationId} className="w-full">
            <RelatedToolCard config={relatedToolConfig} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolDescription({
  descriptionData,
}: Readonly<{ descriptionData: DescriptionBlock[] }>) {
  return (
    <div className="flex flex-col w-full gap-4">
      {map(descriptionData, (descriptionBlock, index) => (
        <ToolDescriptionBlock
          key={`desc-${index}`}
          descriptionBlock={descriptionBlock}
        />
      ))}
    </div>
  );
}

function ToolDescriptionBlock({
  descriptionBlock,
}: Readonly<{
  descriptionBlock: DescriptionBlock;
}>) {
  return (
    <div className="flex flex-col w-full gap-2">
      <Typography variant="h3" fontSize={"inherit"} color="info">
        {descriptionBlock.heading}
      </Typography>
      {!isNil(descriptionBlock.blockData) &&
        isEmpty(descriptionBlock.listData) && (
          <DescriptionDataBlockData blockData={descriptionBlock.blockData} />
        )}
      {!isNil(descriptionBlock.listData) &&
        isEmpty(descriptionBlock.blockData) && (
          <DescriptionDataListData listData={descriptionBlock.listData} />
        )}
      {!isNil(descriptionBlock.links) && (
        <DescriptionLinks links={descriptionBlock.links} />
      )}
    </div>
  );
}

function DescriptionLinks({
  links,
}: Readonly<{
  links: { url: string; displayText: string }[];
}>) {
  return (
    <div className="flex flex-col gap-2">
      {map(links, (link) => (
        <div key={link.url} className="flex flex-row gap-2">
          <KeyboardArrowRightIcon />
          <Typography
            href={link.url}
            component={"a"}
            color="primary"
            target="_blank"
            className="no-underline hover:underline"
          >
            {link.displayText}
          </Typography>
        </div>
      ))}
    </div>
  );
}

function DescriptionDataBlockData({
  blockData,
}: Readonly<{
  blockData: string[];
}>) {
  const parseMarkdownText = (text: string) => {
    // Convert **bold** to actual bold formatting
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Convert `code` to code formatting
    const codeRegex = /`([^`]+)`/g;
    // Convert [link text](url) to actual links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = [];
    let keyCounter = 0;

    // First, find all patterns and their positions
    const patterns = [];

    // Find bold patterns
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "bold",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find code patterns
    boldRegex.lastIndex = 0; // Reset regex
    while ((match = codeRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "code",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find link patterns
    codeRegex.lastIndex = 0; // Reset regex
    while ((match = linkRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "link",
        content: match[1],
        url: match[2],
        fullMatch: match[0],
      });
    }

    // Sort patterns by start position
    patterns.sort((a, b) => a.start - b.start);

    // Process patterns in order
    let lastIndex = 0;
    patterns.forEach((pattern) => {
      // Add text before this pattern
      if (pattern.start > lastIndex) {
        const textBefore = text.slice(lastIndex, pattern.start);
        if (textBefore) parts.push(textBefore);
      }

      // Add the formatted pattern
      if (pattern.type === "bold") {
        parts.push(
          <strong key={`bold-${keyCounter++}`} style={{ fontWeight: 600 }}>
            {pattern.content}
          </strong>
        );
      } else if (pattern.type === "code") {
        parts.push(
          <code
            key={`code-${keyCounter++}`}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "2px 4px",
              borderRadius: "3px",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            {pattern.content}
          </code>
        );
      } else if (pattern.type === "link") {
        parts.push(
          <a
            key={`link-${keyCounter++}`}
            href={pattern.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            {pattern.content}
          </a>
        );
      }

      lastIndex = pattern.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) parts.push(remainingText);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {map(blockData, (data, index) => (
        <Typography
          key={`block-${index}`}
          variant="body1"
          color="textSecondary"
        >
          {parseMarkdownText(data)}
        </Typography>
      ))}
    </div>
  );
}

function DescriptionDataListData({
  listData,
}: Readonly<{
  listData: string[];
}>) {
  const parseMarkdownText = (text: string) => {
    // Convert **bold** to actual bold formatting
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Convert `code` to code formatting
    const codeRegex = /`([^`]+)`/g;
    // Convert [link text](url) to actual links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts = [];
    let keyCounter = 0;

    // First, find all patterns and their positions
    const patterns = [];

    // Find bold patterns
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "bold",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find code patterns
    boldRegex.lastIndex = 0; // Reset regex
    while ((match = codeRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "code",
        content: match[1],
        fullMatch: match[0],
      });
    }

    // Find link patterns
    codeRegex.lastIndex = 0; // Reset regex
    while ((match = linkRegex.exec(text)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "link",
        content: match[1],
        url: match[2],
        fullMatch: match[0],
      });
    }

    // Sort patterns by start position
    patterns.sort((a, b) => a.start - b.start);

    // Process patterns in order
    let lastIndex = 0;
    patterns.forEach((pattern) => {
      // Add text before this pattern
      if (pattern.start > lastIndex) {
        const textBefore = text.slice(lastIndex, pattern.start);
        if (textBefore) parts.push(textBefore);
      }

      // Add the formatted pattern
      if (pattern.type === "bold") {
        parts.push(
          <strong key={`bold-${keyCounter++}`} style={{ fontWeight: 600 }}>
            {pattern.content}
          </strong>
        );
      } else if (pattern.type === "code") {
        parts.push(
          <code
            key={`code-${keyCounter++}`}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "2px 4px",
              borderRadius: "3px",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            {pattern.content}
          </code>
        );
      } else if (pattern.type === "link") {
        parts.push(
          <a
            key={`link-${keyCounter++}`}
            href={pattern.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            {pattern.content}
          </a>
        );
      }

      lastIndex = pattern.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) parts.push(remainingText);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {map(listData, (data, index) => (
        <div key={`list-${index}`} className="flex flex-row gap-2 w-full">
          <KeyboardArrowRightIcon />
          <Typography variant="body1" color="textSecondary">
            {parseMarkdownText(data)}
          </Typography>
        </div>
      ))}
    </div>
  );
}

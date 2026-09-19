"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { apps } from "@/data/apps";
import { AppCategory, AppNavigationConfig } from "@/types/config";

// Event name for triggering the palette from any button or component
export const OPEN_COMMAND_PALETTE_EVENT = "webtoolseasy:open-command-palette";

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
  }
}

// Redirected / merged tools that shouldn't appear as duplicate entries
const EXCLUDED_TOOLS = new Set([
  "tools/text-compare",
  "tools/html-to-markdown",
  "tools/mortgage-calculator",
  "tools/text-editor",
]);

// High-intent search synonyms to improve tool discoverability
const TOOL_SYNONYMS: Record<string, string[]> = {
  "diff-checker": [
    "text compare",
    "compare text",
    "code difference",
    "diff tool",
    "file diff",
    "compare files",
  ],
  "markdown-to-html-converter": [
    "html to markdown",
    "html to md",
    "md to html",
    "convert markdown",
    "markdown parser",
  ],
  "loan-emi-calculator": [
    "mortgage calculator",
    "mortgage",
    "home loan emi",
    "interest calculator",
    "car loan",
  ],
  "markdown-editor": [
    "text editor",
    "markdown preview",
    "online notepad",
    "md editor",
  ],
  jsonformatter: [
    "json beautifier",
    "json validator",
    "json parser",
    "json minify",
    "format json",
  ],
  base64encode: [
    "base64 decode",
    "base64 encoder",
    "base64 decoder",
    "b64",
    "base64 string",
  ],
  uuidv4generator: [
    "uuid generator",
    "guid generator",
    "ulid",
    "random id",
    "unique identifier",
  ],
  imagetotext: [
    "ocr",
    "extract text from image",
    "photo to text",
    "image reader",
    "tesseract",
  ],
  imagecompressor: [
    "reduce image size",
    "compress photo",
    "png compressor",
    "jpeg compressor",
    "webp compressor",
  ],
  pdfmerge: [
    "combine pdf",
    "join pdf",
    "merge documents",
    "pdf joiner",
  ],
  resumebuilder: [
    "cv maker",
    "curriculum vitae",
    "resume maker",
    "create resume",
  ],
  invoicegenerator: [
    "receipt maker",
    "bill maker",
    "create invoice",
    "invoice pdf",
  ],
  sqlformatter: [
    "sql beautifier",
    "format sql",
    "query formatter",
  ],
  sqlpracticeeditor: [
    "sql playground",
    "run sql online",
    "sql runner",
    "sqlite online",
  ],
  regextester: [
    "regular expression",
    "regex checker",
    "regex evaluator",
    "pattern match",
  ],
  cronexpressiongenerator: [
    "crontab",
    "cron schedule",
    "cron generator",
    "cron syntax",
  ],
  jwtdecoder: [
    "json web token",
    "jwt parser",
    "jwt inspect",
    "token decoder",
  ],
  wordcounter: [
    "character counter",
    "word count",
    "letter count",
    "reading time",
  ],
  caseconverter: [
    "uppercase",
    "lowercase",
    "title case",
    "camelcase",
    "snake case",
  ],
  hashgenerator: [
    "md5",
    "sha256",
    "sha512",
    "checksum",
    "crypto hash",
  ],
  csvtojson: [
    "csv json converter",
    "parse csv",
    "convert csv",
  ],
  jsontocsv: [
    "json to table",
    "export json to csv",
    "json csv converter",
  ],
  urlencoderdecoder: [
    "url decode",
    "url encode",
    "uri encode",
    "percent encoding",
  ],
};

const CATEGORIES = [
  "All",
  AppCategory.PROGRAMMING,
  AppCategory.MEDIA,
  AppCategory.TEXT,
  AppCategory.ONLINE_EDITORS,
  AppCategory.FINANCE,
  AppCategory.SEO,
  AppCategory.MISCELLANEOUS,
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // All active tools filtered from apps.ts
  const allTools = useMemo(() => {
    return Object.values(apps).filter(
      (app) => !EXCLUDED_TOOLS.has(app.navigateUrl)
    );
  }, []);

  // Filter tools based on query and category
  const filteredTools = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return allTools.filter((tool) => {
      // Category match
      if (selectedCategory !== "All" && tool.category !== selectedCategory) {
        return false;
      }

      if (!trimmed) return true;

      // Direct title match
      if (tool.displayText.toLowerCase().includes(trimmed)) return true;

      // URL match
      if (tool.navigateUrl.toLowerCase().includes(trimmed)) return true;

      // Category match
      if (tool.category?.toLowerCase().includes(trimmed)) return true;

      // Synonym match
      const synonyms =
        TOOL_SYNONYMS[tool.applicationId] ||
        TOOL_SYNONYMS[tool.navigateUrl.replace("tools/", "")] ||
        [];
      return synonyms.some((syn) => syn.toLowerCase().includes(trimmed));
    });
  }, [allTools, query, selectedCategory]);

  // Reset selected index whenever the query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Open / Close handlers
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedCategory("All");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Navigate to selected tool
  const navigateTo = useCallback(
    (tool: AppNavigationConfig) => {
      handleClose();
      router.push(`/${tool.navigateUrl}`);
    },
    [handleClose, router]
  );

  // Mount effect
  useEffect(() => {
    setMounted(true);

    const onCustomOpen = () => handleOpen();

    const onKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedCategory("All");
            setSelectedIndex(0);
          }
          return !prev;
        });
        return;
      }

      // "/" shortcut when not typing in an input
      if (
        e.key === "/" &&
        !isOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement ||
          (e.target instanceof HTMLElement && e.target.isContentEditable)
        )
      ) {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleOpen, isOpen]);

  // Keyboard navigation inside the palette
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredTools.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredTools.length > 0) {
        setSelectedIndex(
          (prev) => (prev - 1 + filteredTools.length) % filteredTools.length
        );
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        navigateTo(filteredTools[selectedIndex]);
      }
      return;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-20 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <svg
            className="w-5 h-5 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search 110+ tools (e.g. diff, json, pdf, mortgage, jwt)..."
            className="w-full bg-transparent text-base outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
            aria-label="Search tools"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[var(--mui-palette-primary-main)] text-white font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          role="listbox"
          className="overflow-y-auto p-2 divide-y divide-transparent flex-1 max-h-[50vh]"
        >
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm font-medium">No tools found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching by synonym (e.g. &ldquo;compare&rdquo;, &ldquo;ocr&rdquo;, &ldquo;format&rdquo;) or select a different category.
              </p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.applicationId}
                  role="option"
                  aria-selected={isSelected}
                  data-index={idx}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => navigateTo(tool)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-sky-50 dark:bg-sky-950/40 text-[var(--mui-palette-primary-main)] ring-1 ring-[var(--mui-palette-primary-main)]/30"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <img
                        src={`/icons/${tool.iconRelativeUrl}`}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate leading-tight">
                        {tool.displayText}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        /{tool.navigateUrl}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      {tool.category || "Tool"}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-semibold text-[var(--mui-palette-primary-main)]">
                        ↵
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ↓
              </kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ↵
              </kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                ESC
              </kbd>
              to close
            </span>
          </div>

          <span>{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

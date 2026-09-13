"use client";

import React, { useEffect, useState, useCallback, useTransition } from "react";
import { AppChip } from "./lib/ui";

function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function FilterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

export function HomeDiscoveryFilter({
  categories,
  totalTools,
}: Readonly<{
  categories: string[];
  totalTools: number;
}>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(totalTools);
  const [, startTransition] = useTransition();

  const applyFilters = useCallback(
    (query: string, category: string | null) => {
      const q = query.trim().toLowerCase();
      const cat = category ? category.trim().toLowerCase() : null;

      const cardElements = document.querySelectorAll<HTMLElement>(".tool-card-item");
      const sectionElements = document.querySelectorAll<HTMLElement>(".tool-category-section");
      const popularSection = document.getElementById("popular-tools-wrapper");
      const noResultsEl = document.getElementById("no-tools-found");

      let count = 0;

      cardElements.forEach((card) => {
        const name = card.getAttribute("data-tool-name") || "";
        const toolCat = card.getAttribute("data-tool-category") || "";

        const matchesQuery = !q || name.includes(q) || toolCat.includes(q);
        const matchesCategory = !cat || toolCat === cat;

        if (matchesQuery && matchesCategory) {
          card.style.display = "";
          count++;
        } else {
          card.style.display = "none";
        }
      });

      // Show/hide category section headers based on whether any cards inside are visible
      sectionElements.forEach((section) => {
        const visibleCards = section.querySelectorAll<HTMLElement>(
          '.tool-card-item:not([style*="display: none"])',
        );
        if (visibleCards.length === 0) {
          section.style.display = "none";
        } else {
          section.style.display = "";
        }
      });

      // Popular section is only shown when no filter is active
      if (popularSection) {
        popularSection.style.display = !q && !cat ? "" : "none";
      }

      if (noResultsEl) {
        noResultsEl.style.display = count === 0 ? "" : "none";
      }

      setMatchCount(count);

      // Update URL without full page reload
      const url = new URL(window.location.href);
      if (q) {
        url.searchParams.set("search", q);
      } else {
        url.searchParams.delete("search");
      }
      if (cat) {
        url.searchParams.set("category", category!);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState(null, "", url.toString());
    },
    [],
  );

  // Read initial query params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("search") || "";
    const initialCategory = params.get("category");

    if (initialQuery || initialCategory) {
      setSearchQuery(initialQuery);
      setSelectedCategory(initialCategory);
      applyFilters(initialQuery, initialCategory);
    }
  }, [applyFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    startTransition(() => {
      applyFilters(query, selectedCategory);
    });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    startTransition(() => {
      applyFilters(searchQuery, category);
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    applyFilters("", null);
  };

  return (
    <div className="w-full mb-6">
      <section className="app-shell-section flex flex-col gap-4">
        <header className="flex items-center gap-2 mb-1">
          <span className="text-sky-600 dark:text-sky-400">
            <FilterIcon />
          </span>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Discover tools ({matchCount} of {totalTools})
          </h2>
        </header>

        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search 115+ tools by name or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search tools"
            className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 pl-10 pr-10 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                applyFilters("", selectedCategory);
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Category filters">
          <button
            type="button"
            onClick={() => handleCategorySelect(null)}
            className="cursor-pointer"
          >
            <AppChip
              label="All categories"
              variant={!selectedCategory ? "filled" : "outlined"}
              color={!selectedCategory ? "primary" : "default"}
              className="transition-shadow hover:shadow-sm"
            />
          </button>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={`cat-${category}`}
                type="button"
                onClick={() => handleCategorySelect(isSelected ? null : category)}
                className="cursor-pointer"
              >
                <AppChip
                  label={category}
                  variant={isSelected ? "filled" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                  className="transition-shadow hover:shadow-sm"
                />
              </button>
            );
          })}
        </nav>

        {(selectedCategory || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 border-t border-[var(--mui-palette-divider)] pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Active filters:
            </span>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => handleCategorySelect(null)}
                className="cursor-pointer inline-flex items-center gap-1"
              >
                <AppChip
                  label={`Category: ${selectedCategory} ✕`}
                  size="small"
                  color="secondary"
                />
              </button>
            )}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  applyFilters("", selectedCategory);
                }}
                className="cursor-pointer inline-flex items-center gap-1"
              >
                <AppChip
                  label={`Search: "${searchQuery}" ✕`}
                  size="small"
                  color="secondary"
                />
              </button>
            )}
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

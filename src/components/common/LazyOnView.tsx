"use client";

import { Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export function LazyOnView({
  children,
  minHeight = 220,
  rootMargin = "160px",
  className = "",
}: Readonly<{
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
}>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            minHeight,
            borderRadius: 3,
            bgcolor: "action.hover",
          }}
        />
      )}
    </div>
  );
}

import { Skeleton } from "@mui/material";

interface SkeletonWithPropsProps {
  variant?: "text" | "rectangular" | "circular";
  height?: number | string;
  width?: number | string;
  className?: string;
}

export function SkeletonWithProps({
  variant = "rectangular",
  height = 300,
  width = "100%",
  className = "",
}: SkeletonWithPropsProps) {
  return (
    <Skeleton
      variant={variant}
      height={height}
      width={width}
      className={className}
    />
  );
}

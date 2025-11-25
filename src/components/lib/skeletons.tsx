import { Skeleton, Box, Typography } from "@mui/material";

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

/**
 * Enhanced skeleton for tool pages with better content structure
 * Reduces visual shift and improves perceived performance
 */
export function ToolPageSkeleton() {
  return (
    <Box className="w-full flex flex-col gap-4 p-4">
      {/* Tool Title Skeleton */}
      <Box className="flex flex-col gap-2 items-center">
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="text" width="80%" height={24} />
      </Box>

      {/* Tool Controls Skeleton */}
      <Box className="flex gap-2 justify-center flex-wrap">
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={40}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Main Content Area Skeleton */}
      <Box className="flex flex-col gap-3">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: 2 }}
        />

        {/* Secondary Content */}
        <Box className="flex gap-3 mt-2">
          <Skeleton
            variant="rectangular"
            width="48%"
            height={150}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="48%"
            height={150}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>

      {/* Bottom Action Buttons */}
      <Box className="flex gap-2 justify-center mt-4">
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Loading indicator */}
      <Box className="text-center mt-4">
        <Typography variant="body2" color="textSecondary">
          Loading tool...
        </Typography>
      </Box>
    </Box>
  );
}

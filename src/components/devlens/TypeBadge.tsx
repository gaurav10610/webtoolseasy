import { Badge } from "@/components/ui/Badge";

type TypeBadgeProps = {
  type: string;
  confidence: "high" | "medium" | "low";
};

export function TypeBadge({ type, confidence }: TypeBadgeProps) {
  const variant =
    confidence === "high"
      ? "success"
      : confidence === "medium"
        ? "warning"
        : "neutral";

  return <Badge variant={variant}>{type.toUpperCase()}</Badge>;
}

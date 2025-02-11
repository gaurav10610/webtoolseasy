import { BasicChip } from "@/components/lib/chips";

export function Tag({
  label,
  variant = "outlined",
  color = "primary",
  sx = {},
}: Readonly<{
  label: string;
  variant?: "filled" | "outlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  sx?: Record<string, unknown>;
}>) {
  return BasicChip({ label, variant, color, sx });
}

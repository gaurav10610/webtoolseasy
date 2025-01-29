import { Drawer } from "@mui/material";

export default function DrawerWithChildren({
  children,
  open,
  onClose,
  className = "",
  anchor = "left",
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: (value: boolean) => void;
  className?: string;
  anchor?: "left" | "right" | "top" | "bottom";
}) {
  return (
    <Drawer
      open={open}
      onClose={() => onClose(false)}
      className={className}
      anchor={anchor}
    >
      {children}
    </Drawer>
  );
}

import { getRandomId } from "@/util/commonUtils";
import { map } from "lodash-es";
import { ButtonWithLink } from "./lib/buttons";
import { Typography } from "@mui/material";

export const menuItems = [
  {
    label: "Home",
    routeLink: "/",
    openInNewTab: false,
  },
  {
    label: "Blog",
    routeLink: "/blog",
    openInNewTab: true,
  },
];

export default function AppMenu({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex flex-row gap-1 justify-start ${className}`}>
      {map(menuItems, (menuItem) => (
        <ButtonWithLink
          buttonText={
            <Typography className="!text-gray-700 !font-medium" variant="body2">
              {menuItem.label}
            </Typography>
          }
          href={menuItem.routeLink}
          key={getRandomId()}
          title={`Go to ${menuItem.label} Page`}
          size="small"
          variant="outlined"
          className="!capitalize !border-gray-300 hover:!border-blue-500 hover:!bg-blue-50 !text-gray-700 transition-all duration-200"
          target={menuItem.openInNewTab ? "_blank" : undefined}
          rel={menuItem.openInNewTab ? "noopener noreferrer" : undefined}
        />
      ))}
    </nav>
  );
}

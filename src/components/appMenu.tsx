import { getRandomId } from "@/util/commonUtils";
import { map } from "lodash-es";
import { ButtonWithLink } from "./lib/buttons";
import { Typography } from "@mui/material";

export const menuItems = [
  {
    label: "Home",
    routeLink: "/",
  },
  {
    label: "Blog",
    routeLink: "/blog",
  },
];

export default function AppMenu({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-row gap-1 justify-start ${className}`}>
      {map(menuItems, (menuItem) => (
        <ButtonWithLink
          buttonText={
            <Typography color="textPrimary" variant="body2">
              {menuItem.label}
            </Typography>
          }
          href={menuItem.routeLink}
          key={getRandomId()}
          title={`Go to ${menuItem.label} Page`}
          size="small"
          variant="text"
          color="primary"
        />
      ))}
    </div>
  );
}

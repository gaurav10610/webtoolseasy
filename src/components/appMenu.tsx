import { getRandomId } from "@/util/commonUtils";
import { Link, Typography } from "@mui/material";
import { map } from "lodash-es";

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
    <div
      className={`w-full flex flex-row gap-3 justify-start md:gap-5 ${className}`}
    >
      {map(menuItems, (menuItem) => (
        <Link
          key={getRandomId()}
          href={menuItem.routeLink}
          className="!no-underline"
          title={`Go to ${menuItem.label} Page`}
        >
          <Typography variant="body1" color="textPrimary">
            {menuItem.label}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

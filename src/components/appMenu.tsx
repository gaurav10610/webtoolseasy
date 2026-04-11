import { map } from "lodash-es";
import { ButtonWithLink } from "./lib/buttons";

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
    <nav className={`flex flex-row gap-2 justify-start ${className}`}>
      {map(menuItems, (menuItem, index) => (
        <ButtonWithLink
          buttonText={
            <span className="text-sm font-semibold tracking-tight">
              {menuItem.label}
            </span>
          }
          href={menuItem.routeLink}
          key={menuItem.routeLink}
          title={`Go to ${menuItem.label} page`}
          size="small"
          variant={index === 0 ? "contained" : "outlined"}
          color={index === 0 ? "primary" : "inherit"}
          className="!capitalize !rounded-full !border-[var(--mui-palette-divider)] !px-4"
        />
      ))}
    </nav>
  );
}

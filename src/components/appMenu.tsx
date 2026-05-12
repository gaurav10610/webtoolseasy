import { map } from "lodash-es";
import { ButtonWithLink } from "./lib/buttons";
import { isTemplatesEnabled, isWorkflowsEnabled } from "@/lib/workflowFlags";

const baseMenuItems = [
  {
    label: "Home",
    routeLink: "/",
  },
  {
    label: "Workflows",
    routeLink: "/workflows",
  },
  {
    label: "Templates",
    routeLink: "/templates",
  },
  {
    label: "Developer",
    routeLink: "/tools/category/dev-tools",
    className: "hidden xl:inline-flex",
  },
  {
    label: "PDF",
    routeLink: "/tools/category/pdf-tools",
    className: "hidden xl:inline-flex",
  },
  {
    label: "Image",
    routeLink: "/tools/category/image-tools",
    className: "hidden xl:inline-flex",
  },
  {
    label: "Calculators",
    routeLink: "/tools/category/calculators",
    className: "hidden xl:inline-flex",
  },
  {
    label: "Blog",
    routeLink: "/blog",
  },
];

export const menuItems = baseMenuItems.filter((item) => {
  if (item.routeLink === "/workflows") return isWorkflowsEnabled();
  if (item.routeLink === "/templates") return isTemplatesEnabled();
  return true;
});

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
          variant={index === 0 ? "contained" : "text"}
          color={index === 0 ? "primary" : "inherit"}
          className={`${menuItem.className ?? ""} !capitalize !rounded-full !border-[var(--mui-palette-divider)] !px-4`}
        />
      ))}
    </nav>
  );
}

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
    <nav
      className={`flex flex-row gap-1 items-center ${className}`}
      aria-label="Main navigation"
    >
      {map(menuItems, (menuItem) => (
        <ButtonWithLink
          buttonText={
            <span className="text-sm font-medium">{menuItem.label}</span>
          }
          href={menuItem.routeLink}
          key={menuItem.routeLink}
          title={`Go to ${menuItem.label} page`}
          size="small"
          variant="text"
          color="inherit"
          className={`${menuItem.className ?? ""} !capitalize !rounded-full !px-3 !text-[var(--mui-palette-text-primary)] hover:!bg-[var(--mui-palette-action-hover)]`}
        />
      ))}
    </nav>
  );
}

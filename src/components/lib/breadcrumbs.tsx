import { Breadcrumbs, Link, Typography } from "@mui/material";
import { map } from "lodash-es";

export interface BreadcrumbProps {
  links?: {
    label: string;
    url: string;
  }[];
  currentPageLabel: string;
  className?: string;
}

export function BreadcrumbWithProps({
  links = [],
  currentPageLabel,
  className = "",
}: BreadcrumbProps) {
  return (
    <Breadcrumbs aria-label="breadcrumb" className={`mb-2 ${className}`}>
      {map(links, (link: { label: string; url: string }) => (
        <Link
          underline="hover"
          key={link.label}
          color="inherit"
          href={link.url}
        >
          {link.label}
        </Link>
      ))}
      <Typography color="text.primary" variant="inherit">
        {currentPageLabel}
      </Typography>
    </Breadcrumbs>
  );
}

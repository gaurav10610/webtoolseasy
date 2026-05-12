"use client";

import { useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import { AppText } from "./lib/ui";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { isTemplatesEnabled, isWorkflowsEnabled } from "@/lib/workflowFlags";

const navSections = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "/", icon: <HomeRoundedIcon fontSize="small" /> },
      ...(isWorkflowsEnabled()
        ? [
            {
              label: "Workflows",
              href: "/workflows",
              icon: <AccountTreeRoundedIcon fontSize="small" />,
            },
          ]
        : []),
      ...(isTemplatesEnabled()
        ? [
            {
              label: "Templates",
              href: "/templates",
              icon: <DashboardRoundedIcon fontSize="small" />,
            },
          ]
        : []),
      {
        label: "Blog",
        href: "/blog",
        icon: <ArticleRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    title: "Tool Categories",
    items: [
      {
        label: "Developer Tools",
        href: "/tools/category/dev-tools",
        icon: <CodeRoundedIcon fontSize="small" />,
      },
      {
        label: "PDF Tools",
        href: "/tools/category/pdf-tools",
        icon: <PictureAsPdfRoundedIcon fontSize="small" />,
      },
      {
        label: "Image Tools",
        href: "/tools/category/image-tools",
        icon: <ImageRoundedIcon fontSize="small" />,
      },
      {
        label: "Text Tools",
        href: "/tools/category/text-tools",
        icon: <TextFieldsRoundedIcon fontSize="small" />,
      },
      {
        label: "Calculators",
        href: "/tools/category/calculators",
        icon: <CalculateRoundedIcon fontSize="small" />,
      },
    ],
  },
];

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="!rounded-full !border !border-[var(--mui-palette-divider)] !bg-[var(--mui-palette-background-paper)] !shadow-sm !p-2 !text-[var(--mui-palette-text-secondary)]"
      >
        <MenuRoundedIcon fontSize="small" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          className: "w-72 max-w-[85vw]",
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-[var(--mui-palette-background-paper)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--mui-palette-divider)]">
            <AppText className="!font-semibold !text-base">Navigation</AppText>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 px-3 py-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <AppText className="!text-xs !font-semibold !uppercase !tracking-widest !text-[var(--mui-palette-text-secondary)] px-2 mb-2">
                  {section.title}
                </AppText>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--mui-palette-text-primary)] no-underline transition-colors hover:bg-[var(--mui-palette-action-hover)]"
                    >
                      <span className="text-[var(--mui-palette-text-secondary)]">
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <Divider />

          {/* Theme toggle at bottom */}
          <div className="px-4 py-4">
            <AppText className="!text-xs !font-semibold !uppercase !tracking-widest !text-[var(--mui-palette-text-secondary)] mb-3">
              Appearance
            </AppText>
            <ThemeModeToggle />
          </div>
        </div>
      </Drawer>
    </>
  );
}

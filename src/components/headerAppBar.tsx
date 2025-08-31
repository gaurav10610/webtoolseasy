import Link from "next/link";
import { CustomSvgIcon } from "./lib/icons";
import { Typography, Chip, Box } from "@mui/material";
import AppMenu from "./appMenu";
import ApplicationIcon from "@/data/icons/app-icon.svg";

export default function HeaderAppBar({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 ${className}`}
    >
      {/* Main header content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link
            href="/"
            title="Go to Home Page of WebToolsEasy"
            rel="home"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-50 rounded-full blur-sm group-hover:bg-blue-100 transition-colors duration-200"></div>
              <CustomSvgIcon
                size="large"
                className="relative text-blue-600 drop-shadow-sm"
              >
                <ApplicationIcon />
              </CustomSvgIcon>
            </div>
            <div className="flex flex-col">
              <Typography className="!text-2xl !font-bold text-gray-900 tracking-tight">
                WebToolsEasy
              </Typography>
              <Typography className="!text-xs text-gray-600 hidden sm:block">
                Free Online Productivity Tools
              </Typography>
            </div>
          </Link>

          {/* Center section - Tools count badge (visible on larger screens) */}
          <div className="hidden lg:flex items-center">
            <Box className="bg-gray-50 rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Typography className="!text-sm text-gray-700 font-medium">
                  45+ Tools Available
                </Typography>
              </div>
            </Box>
          </div>

          {/* Right section - Menu */}
          <div className="flex items-center space-x-4">
            {/* Quick stats chip (visible on medium screens and up) */}
            <div className="hidden md:block">
              <Chip
                label="100% Free"
                size="small"
                className="!bg-green-500 !text-white !font-semibold !border-0 hover:!bg-green-600 transition-colors duration-200 !shadow-sm"
              />
            </div>
            <AppMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

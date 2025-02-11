import Link from "next/link";
import { CustomSvgIcon } from "./lib/icons";
import { Typography } from "@mui/material";
import AppMenu from "./appMenu";
import ApplicationIcon from "@/data/icons/app-icon.svg";

export default function HeaderAppBar({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div
      className={`sticky top-0 z-50 bg-white shadow-md p-2 flex flex-row gap-2 w-full ${className}`}
    >
      <span className="hidden md:block md:w-[20%]"></span>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-row w-full gap-2">
          <Link href="/" title="Go to Home Page of NaukriNotify" rel="home">
            <div className="flex flex-row gap-2 items-center">
              <CustomSvgIcon size="large">
                <ApplicationIcon />
              </CustomSvgIcon>
              <div className="flex flex-col items-start md:flex-row md:items-center md:gap-1">
                <Typography className="!text-xl !font-medium">
                  WebToolsEasy
                </Typography>
                <Typography variant="caption" className="!italic">
                  (Free Online Web Tools to Make Work Your Super Easy)
                </Typography>
              </div>
            </div>
          </Link>
        </div>
        <AppMenu />
      </div>
      <span className="hidden md:block md:w-[20%]"></span>
    </div>
  );
}

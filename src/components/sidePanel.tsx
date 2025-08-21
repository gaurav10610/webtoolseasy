import { AppNavigationConfig } from "@/types/config";
import { getRandomId } from "@/util/commonUtils";
import { Typography } from "@mui/material";
import { groupBy, keysIn, map, values } from "lodash-es";
import Link from "next/link";

/**
 * This component is used to display the links of the apps in the side panel
 * @param param0
 * @returns
 */
const SectionLinks = ({
  category,
  appList,
  pageUrl,
}: {
  category: string;
  appList: AppNavigationConfig[];
  pageUrl: string;
}) => {
  const selectedPageUrl = `tools/${pageUrl}`;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="body1">{category}</Typography>
      <div className="flex flex-col gap-2 pl-3 border-l-2">
        {map(appList, (app) => (
          <Link href={`../${app.navigateUrl}`} key={getRandomId()}>
            <Typography
              color={
                selectedPageUrl === app.navigateUrl
                  ? "primary"
                  : "textSecondary"
              }
              variant="body2"
            >
              {app.displayText}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function SidePanel({
  className = "",
  appConfigJson,
  pageUrl,
}: Readonly<{
  className?: string;
  appConfigJson: Record<string, AppNavigationConfig>;
  pageUrl: string;
}>) {
  const categoryWiseAppList = groupBy(values(appConfigJson), "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  return (
    <div className={`flex flex-col gap-4 p-3 ${className}`}>
      {map(keysIn(categoryWiseAppList), (category) => (
        <SectionLinks
          key={getRandomId()}
          category={category}
          appList={categoryWiseAppList[category] as AppNavigationConfig[]}
          pageUrl={pageUrl}
        />
      ))}
    </div>
  );
}

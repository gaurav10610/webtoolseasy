import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { getRandomId } from "@/util/commonUtils";
import { Typography } from "@mui/material";
import { groupBy, keysIn, map, values } from "lodash-es";
import Link from "next/link";

const SectionLinks = ({
  category,
  appList,
}: {
  category: string;
  appList: AppNavigationConfig[];
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="body1">{category}</Typography>
      <div className="flex flex-col gap-2 pl-3 border-l-2">
        {map(appList, (app) => (
          <Link href={`../${app.navigateUrl}`} key={getRandomId()} replace>
            <Typography color="textSecondary" variant="body2">
              {app.displayText}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SectionWiseAppLinks = ({
  categoryWiseAppList,
}: {
  categoryWiseAppList: Record<string, unknown[]>;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {map(keysIn(categoryWiseAppList), (category) => (
        <SectionLinks
          key={getRandomId()}
          category={category}
          appList={categoryWiseAppList[category] as AppNavigationConfig[]}
        />
      ))}
    </div>
  );
};

export default function SidePanel({
  className = "",
  appConfigJson,
}: Readonly<{ className?: string; appConfigJson: AppListConfig }>) {
  const categoryWiseAppList = groupBy(values(appConfigJson), "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  return (
    <div className={`flex flex-col gap-3 p-3 w-full ${className}`}>
      <SectionWiseAppLinks categoryWiseAppList={categoryWiseAppList} />
    </div>
  );
}

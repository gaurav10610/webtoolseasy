import { AppHeading } from "@/components/commonComponents";
import { FlexList } from "@/components/lib/flexComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/@types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { isMobileDevice } from "@/lib/server-responsive";
import { groupBy, map, values } from "lodash-es";

function SectionAppList({
  category,
  configs,
  isMobileView,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
  isMobileView: boolean;
}>) {
  return FlexList({
    isFullWidth: true,
    alignCenter: true,
    items: [
      <Typography
        key={getRandomId()}
        variant="h2"
        sx={{
          fontSize: "1.5rem",
        }}
        color="textSecondary"
      >
        {category}
      </Typography>,
      FlexList({
        isFullWidth: true,
        isDirectionRow: true,
        items: map(configs, (config) => {
          return (
            <AppHomeCard
              key={getRandomId()}
              config={config}
              sx={{
                width: isMobileView ? "100%" : "20%",
              }}
            />
          );
        }),
        sx: {
          flexWrap: "wrap",
        },
      }),
    ],
  });
}

export default function Home() {
  const isMobileView = isMobileDevice();
  const appListConfig = appConfigJson as AppListConfig;
  const categoryWiseAppList = groupBy(values(appListConfig), "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  return FlexList({
    isFullWidth: true,
    alignCenter: true,
    items: [
      <AppHeading
        key={getRandomId()}
        heading="Free Online Web Tools: Discover Free Tools to Make Work Super Easy"
      />,
      FlexList({
        isFullWidth: true,
        isDirectionRow: true,
        flexGap: "20px",
        items: [
          ...map(categoryWiseAppList, (configs, category) => {
            return SectionAppList({ category, configs, isMobileView });
          }),
        ],
        sx: {
          flexWrap: "wrap",
        },
      }),
    ],
  });
}

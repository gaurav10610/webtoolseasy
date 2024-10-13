import { ApplicationIds } from "@/data/tools-directory-config";
import { Metadata } from "next";

export interface BaseAppConfig {
  displayText: string;
  navigateUrl: string;
  category: string;
}
export interface AppNavigationConfig extends BaseAppConfig {
  applicationId: string;
  iconName: string;
  iconRelativeUrl: string;
}

export interface ApplicationConfig {
  mainHeading?: string;
  navigationUrl: string;
  metaTags: Metadata[];
  pageTitle: string;
  tags: string[];
  icons: IconConfig[];
  relatedTools: AppNavigationConfig[];
}

export interface IconConfig {
  iconName: string;
  iconRelativeUrl: string;
}

export enum AppCategory {
  TEXT = "Text",
  MISCELLANEOUS = "Miscellaneous",
  PROGRAMMING = "Programming",
  ONLINE_EDITORS = "Online Editors",
  MEDIA = "Media",
  FINANCE = "Finance",
}

export interface AppCatalogue {
  category: string;
  apps: AppNavigationConfig[];
}

export interface AppContext {
  id: ApplicationIds;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

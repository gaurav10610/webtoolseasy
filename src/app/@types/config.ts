import { MetaDefinition } from '@angular/platform-browser';

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
  metaTags: MetaDefinition[];
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
  TEXT = 'Text',
  MISCELLANEOUS = 'Miscellaneous',
  PROGRAMMING = 'Programming',
  ONLINE_EDITORS = 'Online Editors',
  MEDIA = 'Media',
  FINANCE = 'Finance',
}

export interface AppCatalogue {
  category: string;
  apps: AppNavigationConfig[];
}

import { MetaDefinition } from '@angular/platform-browser';

export interface BaseAppConfig {
  displayText: string;
  navigateUrl: string;
}
export interface AppDisplayConfig extends BaseAppConfig {
  applicationId: string;
  iconName: string;
}

export interface ApplicationConfig {
  mainHeading?: string;
  subHeading?: string;
  navigationUrl: string;
  metaTags: MetaDefinition[];
  pageTitle: string;
  tags: string[];
  icons: IconConfig[];
  relatedTools?: AppDisplayConfig[];
}

export interface IconConfig {
  iconName: string;
  iconRelativeUrl: string;
}

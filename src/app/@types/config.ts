import { MetaDefinition } from '@angular/platform-browser';

export interface AppDisplayConfig {
  applicationId: string;
  displayText: string;
  iconName: string;
  navigateUrl: string;
}

export interface ApplicationConfig {
  navigationUrl: string;
  metaTags: MetaDefinition[];
  pageTitle: string;
  tags: string[];
  icons: IconConfig[];
}

export interface IconConfig {
  iconName: string;
  iconRelativeUrl: string;
}

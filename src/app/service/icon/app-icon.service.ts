import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AppIconService {
  iconsPath = `${environment.hostname}assets/images/icons/`;

  iconsConfig = [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
    },
    {
      iconName: 'uuid-icon',
      iconRelativeUrl: 'uuid-icon.svg',
    },
    {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg',
    },
    {
      iconName: 'soon-icon',
      iconRelativeUrl: 'soon-icon.svg',
    },
    {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg',
    },
    {
      iconName: 'image-compress-icon',
      iconRelativeUrl: 'image-compress-icon.svg',
    },
    {
      iconName: 'image-file-icon',
      iconRelativeUrl: 'image-file.svg',
    },
    {
      iconName: 'download-icon',
      iconRelativeUrl: 'download.svg',
    },
    {
      iconName: 'compress-icon',
      iconRelativeUrl: 'compress-icon.svg',
    },
    {
      iconName: 'info-icon',
      iconRelativeUrl: 'info.svg',
    },
    {
      iconName: 'settings-icon',
      iconRelativeUrl: 'settings.svg',
    },
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      /**
       * set assets path when executed in browser
       */
      this.iconsPath = `${environment.hostname}assets/images/icons/`;
    } else {
      /**
       * set assets path when executed on server
       */
      this.iconsPath = `http://localhost:${environment.port}/assets/images/icons/`;
    }

    this.iconsConfig.forEach(iconConfig =>
      this.matIconRegistry.addSvgIcon(
        iconConfig.iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.iconsPath + iconConfig.iconRelativeUrl
        )
      )
    );
  }
}

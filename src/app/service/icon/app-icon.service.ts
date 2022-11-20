import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class AppIconService {
  iconsPath = '../../../assets/images/icons/';

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
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
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

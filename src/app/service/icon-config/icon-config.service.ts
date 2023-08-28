import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';
import { AppContextService } from '../app-context/app-context.service';
import { PlatformMetadataService } from '../platform-metadata/platform-metadata.service';

@Injectable({
  providedIn: 'root',
})
export class IconConfigService {
  constructor(private platformService: PlatformMetadataService) {}

  iconsPath = `${environment.hostname}/assets/images/icons/`;

  async loadCustomIcons(
    icons: IconConfig[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    appContextService: AppContextService
  ) {
    if (this.platformService.isPlatformBrowser) {
      /**
       * set assets path when executed in browser
       */
      this.iconsPath = `${environment.hostname}/assets/images/icons/`;
    } else {
      /**
       * set assets path when executed on server
       */
      this.iconsPath = `http://localhost:${environment.port}/assets/images/icons/`;
    }

    const epochMS: number = Date.now();

    /**
     * load only those icons which are not already registered
     */
    icons
      .filter(
        iconConfig => !appContextService.svgIcons.has(iconConfig.iconName)
      )
      .forEach(iconConfig => {
        matIconRegistry.addSvgIcon(
          iconConfig.iconName,
          domSanitizer.bypassSecurityTrustResourceUrl(`
            ${this.iconsPath}${iconConfig.iconRelativeUrl}?${epochMS}`)
        );
        appContextService.svgIcons.set(iconConfig.iconName, true);
      });
  }
}

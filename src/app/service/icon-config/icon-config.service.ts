import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IconConfigService {
  // svgIcons: Map<string, boolean> = new Map();

  async loadCustomIcons(
    icons: IconConfig[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    /**
     * load only those icons which are not already registered
     */
    icons
      // .filter(iconConfig => !this.svgIcons.has(iconConfig.iconName))
      .forEach(iconConfig => {
        matIconRegistry.addSvgIcon(
          iconConfig.iconName,
          domSanitizer.bypassSecurityTrustResourceUrl(`
          ${environment.hostname}/assets/images/icons/${iconConfig.iconRelativeUrl}?${environment.queryHash}`)
        );
        // this.svgIcons.set(iconConfig.iconName, true);
      });
  }
}

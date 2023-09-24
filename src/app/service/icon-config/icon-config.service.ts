import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IconConfigService {
  registerCustomIcons(
    icons: IconConfig[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    /**
     * load only those icons which are not already registered
     */
    icons.forEach(iconConfig => {
      this.registerCustomIcon(iconConfig, matIconRegistry, domSanitizer);
    });
  }

  async registerCustomIcon(
    iconConfig: IconConfig,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon(
      iconConfig.iconName,
      domSanitizer.bypassSecurityTrustResourceUrl(`
        ${environment.baseIconsPathUrl}${iconConfig.iconRelativeUrl}?${environment.queryHash}`)
    );
  }
}

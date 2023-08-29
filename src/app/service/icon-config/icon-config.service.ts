import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';
import { AppContextService } from '../app-context/app-context.service';
@Injectable({
  providedIn: 'root',
})
export class IconConfigService {
  async loadCustomIcons(
    icons: IconConfig[],
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    appContextService: AppContextService
  ) {
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
          ${environment.hostname}/assets/images/icons/${iconConfig.iconRelativeUrl}?${environment.queryHash}`)
        );
        appContextService.svgIcons.set(iconConfig.iconName, true);
      });
  }
}

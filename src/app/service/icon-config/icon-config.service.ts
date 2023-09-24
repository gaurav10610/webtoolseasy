import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IconConfigService {
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

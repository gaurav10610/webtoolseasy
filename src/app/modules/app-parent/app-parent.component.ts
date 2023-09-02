import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { ICON_CONFIG } from 'src/environments/component-config/app-parent/config';

@Component({
  selector: 'app-app-parent',
  templateUrl: './app-parent.component.html',
  styleUrls: ['./app-parent.component.scss'],
})
export class AppParentComponent {
  constructor(
    private iconConfigService: IconConfigService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public appContextService: AppContextService
  ) {
    this.iconConfigService.loadCustomIcons(
      ICON_CONFIG,
      this.matIconRegistry,
      this.domSanitizer
    );
  }

  onApplicationLoad(event: any) {
    if (event.applicationConfig) {
      this.appContextService.tags = event.applicationConfig.tags;
      this.appContextService.mainHeading = event.applicationConfig.mainHeading!;
      this.appContextService.subHeading = event.applicationConfig.subHeading;
      this.appContextService.relatedTools =
        event.applicationConfig.relatedTools;
    }

    if (event.descriptionData) {
      this.appContextService.descrptionData = event.descriptionData;
    }
  }
}

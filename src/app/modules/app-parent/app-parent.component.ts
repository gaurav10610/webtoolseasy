import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationConfig } from 'src/app/@types/config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { ICON_CONFIG } from 'src/environments/component-config/app-parent/config';
import { environment } from 'src/environments/environment';

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

  /**
   * handle application load event
   * @param event loaded component reference
   */
  onApplicationLoad(event: any) {
    if (event.applicationConfig) {
      const applicationConfig: ApplicationConfig = <ApplicationConfig>(
        event.applicationConfig
      );
      this.appContextService.tags = applicationConfig.tags;
      this.appContextService.mainHeading = applicationConfig.mainHeading!;
      this.appContextService.subHeading = applicationConfig.subHeading;
      this.appContextService.relatedTools = applicationConfig.relatedTools;
      this.appContextService.appUrl = `${environment.hostname}${applicationConfig.navigationUrl}`;
    }

    if (event.descriptionData) {
      this.appContextService.descrptionData = event.descriptionData;
    }
  }
}

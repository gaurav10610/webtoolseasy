import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ApplicationConfig } from 'src/app/@types/config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
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
    public appContextService: AppContextService,
    private metaConfigService: MetaConfigService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any
  ) {
    this.iconConfigService.registerCustomIcons(
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
      this.appContextService.applicationConfig = applicationConfig;
      this.appContextService.appUrl = `${environment.hostname}${applicationConfig.navigationUrl}`;

      /**
       * loading custom icons
       */
      this.iconConfigService.registerCustomIcons(
        applicationConfig.icons,
        this.matIconRegistry,
        this.domSanitizer
      );

      /**
       * adding page meta info
       */
      this.metaConfigService.updatePageMetaData(
        applicationConfig,
        this.titleService,
        this.metaService,
        this.document
      );
    }

    if (event.descriptionData) {
      this.appContextService.descriptionData = event.descriptionData;
    }
  }
}

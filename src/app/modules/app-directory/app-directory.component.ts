import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig, ApplicationConfig } from 'src/app/@types/config';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { componentConfig } from 'src/environments/component-config/app-directory/config';
import { MatIconRegistry } from '@angular/material/icon';
import { appDisplayConfig } from 'src/environments/tools-directory-config';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent {
  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = appDisplayConfig;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService
  ) {
    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer
    );
    this.metaConfigService.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
  }

  navigateByAppId(applicationId: string) {
    const appConfig: AppDisplayConfig = this.appsConfig.find(
      applicationConfig => applicationConfig.applicationId === applicationId
    )!;
    if (appConfig.navigateUrl !== '') {
      this.router.navigateByUrl(appConfig.navigateUrl);
    }
  }

  onAppClick(event: any) {
    event.stopPropagation();
  }
}

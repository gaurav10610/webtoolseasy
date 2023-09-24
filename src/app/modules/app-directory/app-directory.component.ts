import { Component, OnInit } from '@angular/core';
import { AppNavigationConfig, ApplicationConfig } from 'src/app/@types/config';
import { componentConfig } from 'src/environments/component-config/app-directory/config';
import { applicationConfig } from 'src/environments/tools-directory-config';
import { DescriptionBlock } from 'src/app/@types/description';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent implements OnInit {
  /**
   * application config for composing UI
   */
  appsConfig: AppNavigationConfig[] = Array.from(applicationConfig.values());

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = [];

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    private iconConfigService: IconConfigService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.appsConfig
      .map(appConfig => {
        return {
          iconName: appConfig.iconName,
          iconRelativeUrl: appConfig.iconRelativeUrl,
        };
      })
      .forEach(iconConfig =>
        this.iconConfigService.registerCustomIcon(
          iconConfig,
          this.matIconRegistry,
          this.domSanitizer
        )
      );
  }

  onAppClick(event: any) {
    event.stopPropagation();
  }
}

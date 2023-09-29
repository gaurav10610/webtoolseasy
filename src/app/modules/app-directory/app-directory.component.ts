import { Component, OnInit } from '@angular/core';
import {
  AppCatalogue,
  AppNavigationConfig,
  ApplicationConfig,
} from 'src/app/@types/config';
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
  appsCatalogue: AppCatalogue[] = [];

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = [];

  constructor(
    public platformMetaDataService: PlatformMetadataService,
    private iconConfigService: IconConfigService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const appsCategoryMap: Map<string, AppNavigationConfig[]> = new Map();
    applicationConfig.forEach(value => {
      /**
       * load app icons
       */
      this.iconConfigService.registerCustomIcon(
        {
          iconName: value.iconName,
          iconRelativeUrl: value.iconRelativeUrl,
        },
        this.matIconRegistry,
        this.domSanitizer
      );

      const category = value.category;
      if (!appsCategoryMap.has(category)) {
        appsCategoryMap.set(category, []);
      }
      appsCategoryMap.get(category)!.push(value);
    });
    appsCategoryMap.forEach((value, key) => {
      this.appsCatalogue.push({
        category: key,
        apps: value,
      });
    });
  }

  onAppClick(event: any) {
    event.stopPropagation();
  }
}

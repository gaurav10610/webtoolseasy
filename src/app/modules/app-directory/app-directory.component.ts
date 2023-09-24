import { Component } from '@angular/core';
import { AppNavigationConfig, ApplicationConfig } from 'src/app/@types/config';
import { componentConfig } from 'src/environments/component-config/app-directory/config';
import { applicationConfig } from 'src/environments/tools-directory-config';
import { DescriptionBlock } from 'src/app/@types/description';
import { PlatformMetadataService } from 'src/app/service/platform-metadata/platform-metadata.service';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent {
  /**
   * application config for composing UI
   */
  appsConfig: AppNavigationConfig[] = Array.from(applicationConfig.values());

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = [];

  constructor(public platformMetaDataService: PlatformMetadataService) {}

  onAppClick(event: any) {
    event.stopPropagation();
  }
}

import { Component } from '@angular/core';
import { AppDisplayConfig, ApplicationConfig } from 'src/app/@types/config';
import { componentConfig } from 'src/environments/component-config/app-directory/config';
import { appDisplayConfig } from 'src/environments/tools-directory-config';
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

  onAppClick(event: any) {
    event.stopPropagation();
  }
}

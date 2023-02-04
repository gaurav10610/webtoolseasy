import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { tools as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';
import { appDisplayConfig } from 'src/environments/tools-directory-config';
import { AppContextService } from 'src/app/service/app-context/app-context.service';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent extends BaseComponent implements OnInit {
  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = appDisplayConfig;

  appId: string = 'tools';

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService
  ) {
    super();
    this.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer,
      this.platformId
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
  }

  ngOnInit(): void {
    LogUtils.info('app directory component has been rendered');
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

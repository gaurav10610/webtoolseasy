import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { LogUtils } from 'src/app/service/util/logger';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { tools as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent extends BaseComponent implements OnInit {
  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = [
    {
      applicationId: 'uuid',
      displayText: 'Online UUID Generator',
      iconName: 'uuid-icon',
      navigateUrl: '/tools/uuid',
    },
    {
      applicationId: 'jwt',
      displayText: 'Online JWT Decoder',
      iconName: 'jwt-icon',
      navigateUrl: '/tools/jwt',
    },
    {
      applicationId: 'imagecompress',
      displayText: 'Online Image Compressor',
      iconName: 'image-compress-icon',
      navigateUrl: '/tools/image-compress',
    },
    {
      applicationId: 'jsformatter',
      displayText: 'Online JS Formatter',
      iconName: 'js-icon',
      navigateUrl: '/tools/js-formatter',
    },
    {
      applicationId: 'jsonformatter',
      displayText: 'Online JSON Formatter',
      iconName: 'json-icon',
      navigateUrl: '/tools/json-formatter',
    },
    {
      applicationId: 'htmlformatter',
      displayText: 'Online HTML Formatter',
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
    },
    {
      applicationId: 'cssformatter',
      displayText: 'Online CSS Formatter',
      iconName: 'css-icon',
      navigateUrl: '/tools/css-formatter',
    },
    {
      applicationId: 'soon',
      displayText: 'More Tools Coming Soon',
      iconName: 'soon-icon',
      navigateUrl: '',
    },
  ];

  appId: string = 'tools';

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string
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

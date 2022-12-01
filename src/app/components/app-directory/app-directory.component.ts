import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent extends BaseComponent implements OnInit {
  assetsPath = '../../../assets/';

  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = [
    {
      applicationId: 'uuid',
      displayText: 'Online UUID Generator',
      iconName: 'uuid-icon',
    },
    {
      applicationId: 'jwt',
      displayText: 'Online JWT Decoder',
      iconName: 'jwt-icon',
    },
    {
      applicationId: 'jsonformatter',
      displayText: 'Online JSON Formatter',
      iconName: 'json-icon',
    },
    {
      applicationId: 'imagecompress',
      displayText: 'Online Image Compressor',
      iconName: 'image-compress-icon',
    },
    {
      applicationId: 'soon',
      displayText: 'More Tools Coming Soon',
      iconName: 'soon-icon',
    },
  ];

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    appIconService: AppIconService,
    titleService: Title,
    metaService: Meta
  ) {
    super(router, configService, contextService, titleService, metaService);
    this.contextService.setCurrentAppId('tools');
    this.updatePageMetaData();
  }

  ngOnInit(): void {
    LogUtils.info('app directory component has been rendered');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { AppIconService } from 'src/app/service/icon/app-icon.service';
import { LogUtils } from 'src/app/service/util/logger';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-app-directory',
  templateUrl: './app-directory.component.html',
  styleUrls: ['./app-directory.component.scss'],
})
export class AppDirectoryComponent extends BaseComponent implements OnInit {
  assetsPath = '../../../../assets/';

  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = [
    {
      applicationId: 'uuid',
      displayText: 'Generate UUID Online',
      iconName: 'uuid-icon',
    },
    {
      applicationId: 'jwt',
      displayText: 'Decode JWT Online',
      iconName: 'jwt-icon',
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
    private titleService: Title
  ) {
    super(router, configService, contextService);
    this.contextService.setAppId('home');
    this.titleService.setTitle('Tools Home | Web Tools Easy');
  }

  ngOnInit(): void {
    LogUtils.info('app directory component has been rendered');
  }
}

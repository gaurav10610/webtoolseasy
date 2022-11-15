import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';

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
      displayText: 'UUID: Generate UUID Online',
    },
  ];

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService
  ) {
    super(router, configService, contextService);
    this.contextService.setAppId('home');
  }

  ngOnInit(): void {}
}

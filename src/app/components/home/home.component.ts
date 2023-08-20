import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { AppDisplayConfig } from 'src/app/@types/config';
import { BaseComponent } from 'src/app/base/base.component';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { LogUtils } from 'src/app/service/util/logger';
import { componentConfig } from 'src/environments/component-config/home/config';
import { appDisplayConfig } from 'src/environments/tools-directory-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  appId: string = 'home';
  /**
   * application config for composing UI
   */
  appsConfig: AppDisplayConfig[] = appDisplayConfig;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
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
      this.platformId,
      this.appContextService
    );
    this.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );
  }

  ngOnInit(): void {
    LogUtils.info('home component has been rendered');
  }
}

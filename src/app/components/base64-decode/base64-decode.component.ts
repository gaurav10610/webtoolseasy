import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { BaseComponent } from 'src/app/base/base.component';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { LogUtils } from 'src/app/service/util/logger';
import {
  descriptionData,
  componentConfig,
} from 'src/environments/component-config/base64-decode/config';

@Component({
  selector: 'app-base64-decode',
  templateUrl: './base64-decode.component.html',
  styleUrls: ['./base64-decode.component.scss'],
})
export class Base64DecodeComponent extends BaseComponent implements OnInit {
  // base64 data
  base64Data: string | undefined;

  constructor(
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
    this.appContextService.tags = componentConfig.tags;
    this.appContextService.mainHeading = componentConfig.mainHeading!;
    this.appContextService.subHeading = componentConfig.subHeading;
    this.appContextService.descrptionData = descriptionData;
  }

  ngOnInit(): void {
    LogUtils.info('ngOnInit: base64 decode component has rendered');
  }
}

import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { v1, v4 } from 'uuid';
import { Clipboard } from '@angular/cdk/clipboard';
import { LogUtils } from 'src/app/service/util/logger';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { uuid as componentConfig } from 'src/environments/component-config';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  uuidV1: string;
  uuidV4: string;
  appId: string = 'uuid';

  constructor(
    private clipboard: Clipboard,
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
    this.updateTags(componentConfig);
    this.uuidV1 = v1();
    this.uuidV4 = v4();
  }

  ngOnInit(): void {
    LogUtils.info('uuid component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('uuid component: ngAfterViewInit');
  }

  generateUUID(version: string) {
    switch (version) {
      case 'V1':
        this.uuidV1 = v1();
        break;
      case 'V4':
        this.uuidV4 = v4();
        break;
      default:
        this.uuidV4 = v4();
    }
  }

  copyGeneratedId(version: string) {
    if (version === 'V1') {
      this.clipboard.copy(this.uuidV1);
    } else if (version === 'V4') {
      this.clipboard.copy(this.uuidV4);
    }
  }
}

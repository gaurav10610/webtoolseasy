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
  currentUUID: string = v4();
  selectedVersion: string = 'V4';

  displayData: Map<string, any> = new Map();
  description: string = '';
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
    this.displayData.set('V1', {
      description:
        'Version-1 UUIDs are generated from a time and a node ID (usually the MAC address).',
    });
    this.displayData.set('V4', {
      description:
        'Version-4 UUIDs are generated using a random or pseudo-random number.',
    });
    this.description = this.displayData.get('V4').description;
  }

  ngOnInit(): void {
    LogUtils.info('uuid component: ngOnInit');
  }

  ngAfterViewInit(): void {
    LogUtils.info('uuid component: ngAfterViewInit');
  }

  changeVersion(selectedVersion: string) {
    this.selectedVersion = selectedVersion;
    this.description = this.displayData.get(selectedVersion).description;
  }

  generateUUID() {
    switch (this.selectedVersion) {
      case 'V1':
        this.currentUUID = v1();
        break;
      case 'V4':
        this.currentUUID = v4();
        break;
      default:
        this.currentUUID = v4();
    }
  }

  copyGeneratedId() {
    this.clipboard.copy(this.currentUUID);
  }
}

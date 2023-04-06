import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { v1, v4 } from 'uuid';
import { Clipboard } from '@angular/cdk/clipboard';
import { LogUtils } from 'src/app/service/util/logger';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { componentConfig } from 'src/environments/component-config/uuid/config';
import { MatIconRegistry } from '@angular/material/icon';
import { AppContextService } from 'src/app/service/app-context/app-context.service';
import { FileService } from 'src/app/service/file/file.service';

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

  v1Ids: string[] = [];
  v4Ids: string[] = [];

  @ViewChild('bulkV4Input', { static: false })
  bulkV4Input!: ElementRef;

  @ViewChild('bulkV1Input', { static: false })
  bulkV1Input!: ElementRef;

  bulkV4Error: boolean = false;
  bulkV1Error: boolean = false;

  constructor(
    private clipboard: Clipboard,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
    private appContextService: AppContextService,
    private zoneRef: NgZone,
    private fileService: FileService,
    private renderer: Renderer2
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

  /**
   * generate bulk UUIDs with specified version
   * @param version
   */
  generateBulkUUID(version: string) {
    if (version === 'V4') {
      const count = this.bulkV4Input.nativeElement.value;
      if (count <= 1000) {
        this.bulkV4Error = false;
        this.v4Ids = [];
        for (let i = 0; i < count; i++) {
          this.v4Ids.push(v4());
        }
      } else {
        LogUtils.error('more than 1000');
        this.bulkV4Error = true;
      }
    } else if (version === 'V1') {
      const count = this.bulkV1Input.nativeElement.value;
      if (count <= 1000) {
        this.bulkV1Error = false;
        this.v1Ids = [];
        for (let i = 0; i < count; i++) {
          this.v1Ids.push(v1());
        }
      } else {
        LogUtils.error('more than 1000');
        this.bulkV1Error = true;
      }
    }
  }

  /**
   * generate bulk UUIDs with specified version and download to text file
   * @param event
   * @param version
   */
  async downloadUUIDs(event: Event, version: string) {
    /**
     * cancel default action
     */
    event.preventDefault();
    let string = '';
    if (version === 'V4') {
      const count = this.bulkV4Input.nativeElement.value;
      if (count <= 1000) {
        this.bulkV4Error = false;
        for (let i = 0; i < count; i++) {
          string = string.concat(...[v4(), '\r\n']);
        }
        this.fileService.downloadFile(
          `bulk-uuid-${version}-${count}.txt`,
          new Blob([string], { type: 'plain/text' }),
          this.renderer
        );
      } else {
        this.bulkV4Error = true;
      }
    } else if (version === 'V1') {
      const count = this.bulkV1Input.nativeElement.value;
      if (count <= 1000) {
        this.bulkV1Error = false;
        for (let i = 0; i < count; i++) {
          string = string.concat(...[v1(), '\r\n']);
        }
        this.fileService.downloadFile(
          `bulk-uuid-${version}-${count}.txt`,
          new Blob([string], { type: 'plain/text' }),
          this.renderer
        );
      } else {
        this.bulkV1Error = true;
      }
    }
  }
}

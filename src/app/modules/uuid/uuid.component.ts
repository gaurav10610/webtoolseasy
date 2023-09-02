import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { v1, v4 } from 'uuid';
import { Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/uuid/config';
import { MatIconRegistry } from '@angular/material/icon';
import { FileService } from 'src/app/service/file/file.service';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent {
  uuidV1: string;
  uuidV4: string;

  v1Ids: string[] = [];
  v4Ids: string[] = [];

  @ViewChild('bulkV4Input', { static: false })
  bulkV4Input!: ElementRef;

  @ViewChild('bulkV1Input', { static: false })
  bulkV1Input!: ElementRef;

  bulkV4Error: boolean = false;
  bulkV1Error: boolean = false;

  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  constructor(
    private clipboard: Clipboard,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fileService: FileService,
    private renderer: Renderer2,
    private metaConfigService: MetaConfigService,
    private iconConfigService: IconConfigService
  ) {
    this.iconConfigService.loadCustomIcons(
      componentConfig.icons,
      this.matIconRegistry,
      this.domSanitizer
    );
    this.metaConfigService.updatePageMetaData(
      componentConfig,
      this.titleService,
      this.metaService,
      this.document
    );

    this.uuidV1 = v1();
    this.uuidV4 = v4();
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

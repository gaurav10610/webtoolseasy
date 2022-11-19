import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ConfigService } from 'src/app/service/common/config.service';
import { ContextService } from 'src/app/service/context/context.service';
import { v1, v4 } from 'uuid';
import { Clipboard } from '@angular/cdk/clipboard';
import { LogUtils } from 'src/app/service/util/logger';
import { AppIconService } from 'src/app/service/icon/app-icon.service';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent extends BaseComponent implements OnInit {
  currentUUID: string = v4();
  selectedVersion: string = 'V4';

  displayData: Map<string, any> = new Map();
  description: string;

  constructor(
    router: Router,
    configService: ConfigService,
    contextService: ContextService,
    private clipboard: Clipboard,
    appIconService: AppIconService
  ) {
    super(router, configService, contextService);
    this.contextService.setAppId('uuid');
    this.tags = <string[]>(
      this.configService.getApplicationTags(
        this.contextService.getCurrentAppId()
      )
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
    LogUtils.info('uuid component has been rendered');
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

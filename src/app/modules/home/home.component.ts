import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { IconConfigService } from 'src/app/service/icon-config/icon-config.service';
import { MetaConfigService } from 'src/app/service/meta-config/meta-config.service';
import { componentConfig } from 'src/environments/component-config/home/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
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
  }
}

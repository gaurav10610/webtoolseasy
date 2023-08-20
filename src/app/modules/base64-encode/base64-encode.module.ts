import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64EncodeRoutingModule } from './base64-encode-routing.module';
import { Base64EncodeComponent } from 'src/app/components/base64-encode/base64-encode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';

@NgModule({
  declarations: [Base64EncodeComponent],
  imports: [
    CommonModule,
    Base64EncodeRoutingModule,
    ShareButtonsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
    RelatedToolsModule,
  ],
})
export class Base64EncodeModule {}

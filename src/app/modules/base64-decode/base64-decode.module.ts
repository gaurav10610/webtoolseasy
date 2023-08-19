import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64DecodeRoutingModule } from './base64-decode-routing.module';
import { Base64DecodeComponent } from 'src/app/components/base64-decode/base64-decode.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';

@NgModule({
  declarations: [Base64DecodeComponent],
  imports: [
    CommonModule,
    Base64DecodeRoutingModule,
    MatButtonModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
    RelatedToolsModule,
  ],
})
export class Base64DecodeModule {}

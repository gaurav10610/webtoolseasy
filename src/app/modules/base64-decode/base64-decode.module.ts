import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64DecodeRoutingModule } from './base64-decode-routing.module';
import { Base64DecodeComponent } from 'src/app/components/base64-decode/base64-decode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';

@NgModule({
  declarations: [Base64DecodeComponent],
  imports: [
    CommonModule,
    Base64DecodeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
  ],
})
export class Base64DecodeModule {}

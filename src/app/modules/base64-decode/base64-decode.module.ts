import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64DecodeRoutingModule } from './base64-decode-routing.module';
import { Base64DecodeComponent } from './base64-decode.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';
import { RelatedToolsModule } from 'src/app/modules/related-tools/related-tools.module';
import { ShareButtonsModule } from 'src/app/modules/share-buttons/share-buttons.module';
import { FollowButtonsModule } from 'src/app/modules/follow-buttons/follow-buttons.module';

@NgModule({
  declarations: [Base64DecodeComponent],
  imports: [
    CommonModule,
    Base64DecodeRoutingModule,
    ShareButtonsModule,
    FollowButtonsModule,
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

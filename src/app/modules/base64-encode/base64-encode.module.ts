import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64EncodeRoutingModule } from './base64-encode-routing.module';
import { Base64EncodeComponent } from 'src/app/components/base64-encode/base64-encode.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';

@NgModule({
  declarations: [Base64EncodeComponent],
  imports: [
    CommonModule,
    Base64EncodeRoutingModule,
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
export class Base64EncodeModule {}

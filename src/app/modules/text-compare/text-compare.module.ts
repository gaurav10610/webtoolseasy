import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCompareRoutingModule } from './text-compare-routing.module';
import { TextCompareComponent } from 'src/app/components/text-compare/text-compare.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';
import { FooterModule } from 'src/app/modules/footer/footer-module';
import { DescriptionModule } from 'src/app/modules/description/description.module';

@NgModule({
  declarations: [TextCompareComponent],
  imports: [
    CommonModule,
    TextCompareRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
    FooterModule,
    DescriptionModule,
  ],
})
export class TextCompareModule {}

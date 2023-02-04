import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlFormatterRoutingModule } from './html-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HtmlFormatterComponent } from 'src/app/components/html-formatter/html-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';

@NgModule({
  declarations: [HtmlFormatterComponent],
  imports: [
    CommonModule,
    HtmlFormatterRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
  ],
})
export class HtmlFormatterModule {}

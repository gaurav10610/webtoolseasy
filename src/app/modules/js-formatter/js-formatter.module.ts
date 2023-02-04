import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsFormatterRoutingModule } from './js-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JsFormatterComponent } from 'src/app/components/js-formatter/js-formatter.component';
import { HeaderToolbarModule } from 'src/app/modules/header-toolbar/header-toolbar.module';
import { ToolHeadingModule } from 'src/app/modules/tool-heading/tool-heading.module';
import { TagsModule } from 'src/app/modules/tags/tags.module';

@NgModule({
  declarations: [JsFormatterComponent],
  imports: [
    CommonModule,
    JsFormatterRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    HeaderToolbarModule,
    ToolHeadingModule,
    TagsModule,
  ],
})
export class JsFormatterModule {}

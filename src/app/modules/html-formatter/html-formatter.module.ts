import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlFormatterRoutingModule } from './html-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HtmlFormatterComponent } from './html-formatter.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [HtmlFormatterComponent],
  imports: [
    CommonModule,
    HtmlFormatterRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class HtmlFormatterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlEditorRoutingModule } from './html-editor-routing.module';
import { HtmlEditorComponent } from './html-editor.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HtmlEditorComponent],
  imports: [
    CommonModule,
    HtmlEditorRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class HtmlEditorModule {}

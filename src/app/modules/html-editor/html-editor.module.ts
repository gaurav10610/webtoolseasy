import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlEditorRoutingModule } from './html-editor-routing.module';
import { HtmlEditorComponent } from './html-editor.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [HtmlEditorComponent],
  imports: [
    CommonModule,
    HtmlEditorRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class HtmlEditorModule {}

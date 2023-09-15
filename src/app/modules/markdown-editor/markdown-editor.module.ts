import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    MarkdownEditorRoutingModule,
    FormsModule,
    LMarkdownEditorModule,
  ],
})
export class MarkdownEditorModule {}

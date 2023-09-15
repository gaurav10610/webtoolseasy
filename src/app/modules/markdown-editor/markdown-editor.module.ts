import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [CommonModule, MarkdownEditorRoutingModule],
})
export class MarkdownEditorModule {}

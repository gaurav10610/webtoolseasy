import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    MarkdownEditorRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class MarkdownEditorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorRoutingModule } from './text-editor-routing.module';
import { TextEditorComponent } from './text-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TextEditorComponent],
  imports: [
    CommonModule,
    TextEditorRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatButtonToggleModule,
    MatInputModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class TextEditorModule {}

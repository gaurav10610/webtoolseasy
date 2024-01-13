import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsEditorRoutingModule } from './js-editor-routing.module';
import { JsEditorComponent } from './js-editor.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [JsEditorComponent],
  imports: [
    CommonModule,
    JsEditorRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class JsEditorModule {}

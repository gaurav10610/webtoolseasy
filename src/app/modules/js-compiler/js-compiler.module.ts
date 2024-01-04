import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsCompilerRoutingModule } from './js-compiler-routing.module';
import { JsCompilerComponent } from './js-compiler.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [JsCompilerComponent],
  imports: [
    CommonModule,
    JsCompilerRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JsCompilerModule {}

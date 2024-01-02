import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsCompilerRoutingModule } from './js-compiler-routing.module';
import { JsCompilerComponent } from './js-compiler.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [JsCompilerComponent],
  imports: [
    CommonModule,
    JsCompilerRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class JsCompilerModule {}

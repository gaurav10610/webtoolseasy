import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsEditorRoutingModule } from './js-editor-routing.module';
import { JsEditorComponent } from './js-editor.component';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [JsEditorComponent],
  imports: [
    CommonModule,
    JsEditorRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class JsEditorModule {}

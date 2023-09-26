import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsEditorRoutingModule } from './js-editor-routing.module';
import { JsEditorComponent } from './js-editor.component';

@NgModule({
  declarations: [JsEditorComponent],
  imports: [CommonModule, JsEditorRoutingModule],
})
export class JsEditorModule {}

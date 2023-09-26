import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlEditorRoutingModule } from './html-editor-routing.module';
import { HtmlEditorComponent } from './html-editor.component';

@NgModule({
  declarations: [HtmlEditorComponent],
  imports: [CommonModule, HtmlEditorRoutingModule],
})
export class HtmlEditorModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XmlToJsonRoutingModule } from './xml-to-json-routing.module';
import { XmlToJsonComponent } from './xml-to-json.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [XmlToJsonComponent],
  imports: [
    CommonModule,
    XmlToJsonRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    FormsModule,
    MatCheckboxModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class XmlToJsonModule {}

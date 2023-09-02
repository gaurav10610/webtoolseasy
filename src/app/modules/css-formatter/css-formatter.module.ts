import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssFormatterRoutingModule } from './css-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CssFormatterComponent } from './css-formatter.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [CssFormatterComponent],
  imports: [
    CommonModule,
    CssFormatterRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class CssFormatterModule {}

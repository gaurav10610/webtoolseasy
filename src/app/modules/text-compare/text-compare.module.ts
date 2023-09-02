import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCompareRoutingModule } from './text-compare-routing.module';
import { TextCompareComponent } from './text-compare.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [TextCompareComponent],
  imports: [
    CommonModule,
    TextCompareRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class TextCompareModule {}

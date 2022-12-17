import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlFormatterRoutingModule } from './html-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HtmlFormatterComponent } from 'src/app/components/html-formatter/html-formatter.component';

@NgModule({
  declarations: [HtmlFormatterComponent],
  imports: [
    CommonModule,
    HtmlFormatterRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class HtmlFormatterModule {}

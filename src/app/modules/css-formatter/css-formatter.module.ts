import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CssFormatterRoutingModule } from './css-formatter-routing.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CssFormatterComponent } from 'src/app/components/css-formatter/css-formatter.component';

@NgModule({
  declarations: [CssFormatterComponent],
  imports: [
    CommonModule,
    CssFormatterRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class CssFormatterModule {}

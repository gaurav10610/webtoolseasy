import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsFormatterRoutingModule } from './js-formatter-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JsFormatterComponent } from 'src/app/components/js-formatter/js-formatter.component';

@NgModule({
  declarations: [JsFormatterComponent],
  imports: [
    CommonModule,
    JsFormatterRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JsFormatterModule {}

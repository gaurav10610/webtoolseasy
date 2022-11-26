import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormatterRoutingModule } from './json-formatter-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatChipsModule } from '@angular/material/chips';
import { JsonFormatterComponent } from 'src/app/components/json-formatter/json-formatter.component';

@NgModule({
  declarations: [JsonFormatterComponent],
  imports: [
    CommonModule,
    JsonFormatterRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ClipboardModule,
  ],
})
export class JsonFormatterModule {}

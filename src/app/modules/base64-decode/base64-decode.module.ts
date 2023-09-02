import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64DecodeRoutingModule } from './base64-decode-routing.module';
import { Base64DecodeComponent } from './base64-decode.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Base64DecodeComponent],
  imports: [CommonModule, Base64DecodeRoutingModule, MatButtonModule],
})
export class Base64DecodeModule {}

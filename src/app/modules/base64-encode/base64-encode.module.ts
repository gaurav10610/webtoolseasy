import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Base64EncodeRoutingModule } from './base64-encode-routing.module';
import { Base64EncodeComponent } from './base64-encode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Base64EncodeComponent],
  imports: [
    CommonModule,
    Base64EncodeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class Base64EncodeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrCodeGeneratorRoutingModule } from './qr-code-generator-routing.module';
import { QrCodeGeneratorComponent } from './qr-code-generator.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [QrCodeGeneratorComponent],
  imports: [
    CommonModule,
    QrCodeGeneratorRoutingModule,
    MatInputModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class QrCodeGeneratorModule {}

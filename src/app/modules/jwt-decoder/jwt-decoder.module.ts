import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtDecoderRoutingModule } from './jwt-decoder-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JwtDecoderComponent } from './jwt-decoder.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [JwtDecoderComponent],
  imports: [
    CommonModule,
    JwtDecoderRoutingModule,
    NgxJsonViewerModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JwtDecoderModule {}

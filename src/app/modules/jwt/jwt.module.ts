import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtRoutingModule } from './jwt-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JwtComponent } from './jwt.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [JwtComponent],
  imports: [
    CommonModule,
    JwtRoutingModule,
    NgxJsonViewerModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JwtModule {}

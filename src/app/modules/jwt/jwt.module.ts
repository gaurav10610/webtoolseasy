import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtRoutingModule } from './jwt-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JwtComponent } from 'src/app/components/jwt/jwt.component';

@NgModule({
  declarations: [JwtComponent],
  imports: [
    CommonModule,
    JwtRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class JwtModule {}

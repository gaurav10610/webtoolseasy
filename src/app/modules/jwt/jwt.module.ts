import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtRoutingModule } from './jwt-routing.module';
import { JwtComponent } from './jwt/jwt.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [JwtComponent],
  imports: [
    CommonModule,
    JwtRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class JwtModule {}

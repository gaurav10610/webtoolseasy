import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtRoutingModule } from './jwt-routing.module';
import { JwtComponent } from './jwt/jwt.component';

@NgModule({
  declarations: [JwtComponent],
  imports: [CommonModule, JwtRoutingModule],
})
export class JwtModule {}

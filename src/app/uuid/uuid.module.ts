import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidRoutingModule } from './uuid-routing.module';
import { UuidComponent } from './uuid/uuid.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [UuidComponent],
  imports: [
    CommonModule,
    UuidRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class UuidModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidRoutingModule } from './uuid-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { UuidComponent } from './uuid.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UuidComponent],
  imports: [
    CommonModule,
    UuidRoutingModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatInputModule,
  ],
})
export class UuidModule {}

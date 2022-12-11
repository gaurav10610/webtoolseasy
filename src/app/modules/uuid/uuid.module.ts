import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidRoutingModule } from './uuid-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { UuidComponent } from 'src/app/components/uuid/uuid.component';

@NgModule({
  declarations: [UuidComponent],
  imports: [
    CommonModule,
    UuidRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    ClipboardModule,
  ],
})
export class UuidModule {}

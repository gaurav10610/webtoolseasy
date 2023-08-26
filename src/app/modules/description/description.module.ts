import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DescriptionComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [DescriptionComponent],
})
export class DescriptionModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DescriptionComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DescriptionComponent],
})
export class DescriptionModule {}

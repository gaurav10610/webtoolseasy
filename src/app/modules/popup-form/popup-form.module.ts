import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupFormComponent } from 'src/app/components/popup-form/popup-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PopupFormComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatDialogModule,
  ],
  exports: [PopupFormComponent],
})
export class PopupFormModule {}

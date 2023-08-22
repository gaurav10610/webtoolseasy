import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FollowButtonsComponent } from './follow-buttons.component';

@NgModule({
  declarations: [FollowButtonsComponent],
  imports: [CommonModule, MatIconModule],
  exports: [FollowButtonsComponent],
})
export class FollowButtonsModule {}

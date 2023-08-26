import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsComponent } from './share-buttons.component';
import { ShareModule } from 'ngx-sharebuttons';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ShareButtonsComponent],
  imports: [CommonModule, ShareModule, MatIconModule, MatButtonModule],
  exports: [ShareButtonsComponent],
})
export class ShareButtonsModule {}

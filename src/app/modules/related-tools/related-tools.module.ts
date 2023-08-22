import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedToolsComponent } from './related-tools.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RelatedToolsComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [RelatedToolsComponent],
})
export class RelatedToolsModule {}

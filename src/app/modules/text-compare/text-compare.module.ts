import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCompareRoutingModule } from './text-compare-routing.module';
import { TextCompareComponent } from 'src/app/components/text-compare/text-compare.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TextCompareComponent],
  imports: [
    CommonModule,
    TextCompareRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class TextCompareModule {}

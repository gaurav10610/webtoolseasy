import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseConverterRoutingModule } from './case-converter-routing.module';
import { CaseConverterComponent } from './case-converter.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CaseConverterComponent],
  imports: [
    CommonModule,
    CaseConverterRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class CaseConverterModule {}

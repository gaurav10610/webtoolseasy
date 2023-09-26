import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompoundInterestCalculatorRoutingModule } from './compound-interest-calculator-routing.module';
import { CompoundInterestCalculatorComponent } from './compound-interest-calculator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CompoundInterestCalculatorComponent],
  imports: [
    CommonModule,
    CompoundInterestCalculatorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class CompoundInterestCalculatorModule {}

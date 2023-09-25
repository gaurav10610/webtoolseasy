import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompoundInterestCalculatorRoutingModule } from './compound-interest-calculator-routing.module';
import { CompoundInterestCalculatorComponent } from './compound-interest-calculator.component';

@NgModule({
  declarations: [CompoundInterestCalculatorComponent],
  imports: [CommonModule, CompoundInterestCalculatorRoutingModule],
})
export class CompoundInterestCalculatorModule {}

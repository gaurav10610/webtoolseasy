import { _isNumberValue } from '@angular/cdk/coercion';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import {
  componentConfig,
  descriptionData,
} from 'src/environments/component-config/compound-interest-calculator/config';

@Component({
  selector: 'app-compound-interest-calculator',
  templateUrl: './compound-interest-calculator.component.html',
  styleUrls: ['./compound-interest-calculator.component.scss'],
})
export class CompoundInterestCalculatorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  applicationConfig: ApplicationConfig = componentConfig;
  descriptionData: DescriptionBlock[] = descriptionData;

  initialAmount = new FormControl('1000');
  interestRate = new FormControl('6');
  investmentTime = new FormControl('12');
  compoundFrequency = new FormControl('quaterly');

  errors: string[] = [];

  subscriptions: Subscription[] = [];

  compoundInterestResult: any = {};

  ngOnInit(): void {
    const n = 4;
    const amount: number = 1000 * Math.pow(1 + 6 / (n * 100), n * 1);

    const interest = amount - 1000;
    this.compoundInterestResult = {
      interest: Math.round((interest + Number.EPSILON) * 100) / 100,
      amount: Math.round((amount + Number.EPSILON) * 100) / 100,
      principal: 1000,
    };
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.initialAmount.valueChanges.subscribe(value => {
        this.errors = [];
        this.calculateInterest();
      })
    );

    this.subscriptions.push(
      this.interestRate.valueChanges.subscribe(value => {
        this.errors = [];
        this.calculateInterest();
      })
    );

    this.subscriptions.push(
      this.investmentTime.valueChanges.subscribe(value => {
        this.errors = [];
        this.calculateInterest();
      })
    );

    this.subscriptions.push(
      this.compoundFrequency.valueChanges.subscribe(value => {
        this.errors = [];
        this.calculateInterest();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * calculate interest
   */
  calculateInterest() {
    if (!_isNumberValue(this.initialAmount.value)) {
      this.errors.push('initial amount should be a number');
    }

    if (!_isNumberValue(this.interestRate.value)) {
      this.errors.push('interest rate should be a number');
    }

    if (!_isNumberValue(this.investmentTime.value)) {
      this.errors.push('investment tenure should be a number');
    }

    if (this.errors.length === 0) {
      const frequency = this.compoundFrequency.value;

      /**
       * convert tenure in years
       */
      const tenureInYears: number = Number(this.investmentTime.value) / 12;

      /**
       *
       * n is the number of times that interest is compounded per unit t,
       * for example if interest is compounded monthly and t is in years then the
       * value of n would be 12. If interest is compounded quarterly and t is in
       * years then the value of n would be 4.
       *
       */
      let n: number = 1;

      if (frequency === 'quaterly') {
        n = 4;
      } else if (frequency === 'monthly') {
        n = 12;
      }

      const amount: number =
        Number(this.initialAmount.value) *
        Math.pow(
          1 + Number(this.interestRate.value) / (n * 100),
          n * tenureInYears
        );

      const interest = amount - Number(this.initialAmount.value);

      this.compoundInterestResult = {
        interest: Math.round((interest + Number.EPSILON) * 100) / 100,
        amount: Math.round((amount + Number.EPSILON) * 100) / 100,
        principal: Number(this.initialAmount.value),
      };
    }
  }
}

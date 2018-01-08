import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IAppState } from '../../../store';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';

import {
  UPDATE_QUESTION1,
  UPDATE_QUESTION2,
  UPDATE_PLAYZONE,
  UPDATE_AGE,
  UPDATE_ANNUAL_INCOME,
  UPDATE_TOTAL_ANNUAL_CONTRIBUTION
} from '../../../actions';

@Component({
  selector: 'app-question1',
  template: `
    <div>
    <h1 class="heading">Tell us about yourself</h1>
    <p class="question-text">
        I am
        <span class="answer">
            <input class="number" type="number" name="age" [ngModel]="age" (ngModelChange)="ageChange($event,age)">
        </span> years old and my gross
        <br />
        <b>annual</b> taxable income for the tax year ending 28 February 2019 will be
        <span class="answer">R
            <input type="number" name="annualIncome" [ngModel]="annualIncome" (ngModelChange)="annualIncomeChange($event,annualIncome)" >
        </span>
    </p>
    </div>
  `,
  styleUrls: ['./question1.component.css']
})
export class Question1Component implements OnInit {

  age: number;
  annualIncome: number;

  private age$: Subscription;
  private annualIncome$: Subscription;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.age$ = this.ngRedux.select<number>(state => state.age).subscribe(age => { this.age = age; });
    this.annualIncome$ = this.ngRedux.select<number>(state => state.annualIncome).subscribe(annualIncome => { this.annualIncome = annualIncome; });
  }
  ngOnDestroy() {
    this.age$.unsubscribe();
    this.annualIncome$.unsubscribe();
  }

  ageChange(event) {
    this.age = event;
    this.ngRedux.dispatch({ type: UPDATE_AGE, payload: this.age });
  }

  annualIncomeChange(event) {
    this.annualIncome = event;
    this.ngRedux.dispatch({ type: UPDATE_ANNUAL_INCOME, payload: this.annualIncome })
  }
}

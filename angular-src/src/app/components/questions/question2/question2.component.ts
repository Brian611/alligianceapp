import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../../store';
import { NgRedux } from 'ng2-redux';
import { UPDATE_TOTAL_ANNUAL_CONTRIBUTION } from '../../../actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question2',
  template: `
    <div>
    <h1 class="heading"> Current Retirement Savings</h1>
    <p class="question-text">
        My total
        <b>annual</b> contribution are
        <span class="answer">R
            <input type="number" name="totAnnualContribution" [ngModel]="totAnnualContribution" (ngModelChange)="totAnnualContributionChange($event,totAnnualContribution)" >
        </span>
    </p>
    </div>
  `,
  styleUrls: ['../question1/question1.component.css']
})
export class Question2Component implements OnInit {

  totAnnualContribution: number;

  private totAnnualContribution$: Subscription;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.totAnnualContribution$ = this.ngRedux.select<number>(state => state.totAnnualContribution).subscribe(totAnnualContribution => { this.totAnnualContribution = totAnnualContribution; });
  }

  ngOnDestroy() {
    this.totAnnualContribution$.unsubscribe();
  }
  
  totAnnualContributionChange(event) {
    this.totAnnualContribution = event;
    this.ngRedux.dispatch({ type: UPDATE_TOTAL_ANNUAL_CONTRIBUTION, payload: this.totAnnualContribution })
  }
}

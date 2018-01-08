import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { IAppState } from '../../store';
import { NgRedux, select } from 'ng2-redux';
import { Subscription } from 'rxjs/Subscription';

import {
  UPDATE_QUESTION1,
  UPDATE_QUESTION2,
  UPDATE_PLAYZONE,
  UPDATE_AGE,
  UPDATE_ANNUAL_INCOME,
  UPDATE_TOTAL_ANNUAL_CONTRIBUTION,
  UPDATE_PERCENTAGE_COMPLETE
} from '../../actions';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {


  question1: boolean;
  question2: boolean;
  playzone: boolean;
  age: number;
  annualIncome: number;
  totAnnualContribution: number;
  percentageComplete: number;

  private question1$: Subscription;
  private question2$: Subscription;
  private playzone$: Subscription;
  private age$: Subscription;
  private annualIncome$: Subscription;
  private totAnnualContribution$: Subscription;
  private percentageComplete$: Subscription;

  constructor(private flashMessagesService: FlashMessagesService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>) {

  }

  ngOnInit() {
    this.age$ = this.ngRedux.select<number>(state => state.age).subscribe(age => { this.age = age; });
    this.annualIncome$ = this.ngRedux.select<number>(state => state.annualIncome).subscribe(annualIncome => { this.annualIncome = annualIncome; });
    this.totAnnualContribution$ = this.ngRedux.select<number>(state => state.totAnnualContribution).subscribe(totAnnualContribution => { this.totAnnualContribution = totAnnualContribution; });
    this.question1$ = this.ngRedux.select<boolean>(state => state.question1).subscribe(question1 => { this.question1 = question1; });
    this.question2$ = this.ngRedux.select<boolean>(state => state.question2).subscribe(question2 => { this.question2 = question2; });
    this.playzone$ = this.ngRedux.select<boolean>(state => state.playzone).subscribe(playzone => { this.playzone = playzone; });
    this.percentageComplete$ = this.ngRedux.select<number>(state => state.percentageComplete).subscribe(percentageComplete => { this.percentageComplete = percentageComplete; });
  }

  ngOnDestroy() {
    this.age$.unsubscribe();
    this.annualIncome$.unsubscribe();
    this.totAnnualContribution$.unsubscribe();
    this.question1$.unsubscribe();
    this.question2$.unsubscribe();
    this.playzone$.unsubscribe();
    this.percentageComplete$.unsubscribe();
  }

  onPrev() {
    if (this.question2) {
      this.ngRedux.dispatch({ type: UPDATE_QUESTION2, payload: false });
      this.ngRedux.dispatch({ type: UPDATE_QUESTION1, payload: true });
      if (this.totAnnualContribution == null || this.totAnnualContribution <= 0) {
        if (this.percentageComplete == 80) {
          this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: 0 });
        } else {
          this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: -20 });
        }
      }

    }
    if (this.playzone) {
      this.ngRedux.dispatch({ type: UPDATE_PLAYZONE, payload: false });
      this.ngRedux.dispatch({ type: UPDATE_QUESTION2, payload: true });
    }

  }

  onQ1Next() {
    if (this.age == undefined || this.annualIncome == undefined || this.age == null || this.annualIncome == null) {
      this.flashMessagesService.show('Fill in all fields', { cssClass: 'error', timeout: 3000 });
      return false;
    }
    if (this.age <= 0) {
      this.flashMessagesService.show('Invalid age', { cssClass: 'warning', timeout: 3000 });
      return false;
    }
    if (this.annualIncome <= 0) {
      this.flashMessagesService.show('Invalid annual income', { cssClass: 'warning', timeout: 3000 });
      return false;
    }
    this.ngRedux.dispatch({ type: UPDATE_QUESTION1, payload: false });
    this.ngRedux.dispatch({ type: UPDATE_QUESTION2, payload: true });
    if (this.percentageComplete == 100 || this.percentageComplete == 80) {
      this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: 0 });
    } else {
      this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: 30 });
    }
  }

  onQ2Next() {
    if (this.totAnnualContribution == undefined || this.totAnnualContribution == null) {
      this.flashMessagesService.show('Fill in all fields', { cssClass: 'error', timeout: 3000 });
      return false;
    }
    if (this.totAnnualContribution <= 0) {
      this.flashMessagesService.show('invalid total annual contribution', { cssClass: 'warning', timeout: 3000 });
      return false;
    }
    this.ngRedux.dispatch({ type: UPDATE_QUESTION2, payload: false });
    this.ngRedux.dispatch({ type: UPDATE_PLAYZONE, payload: true });
    if (this.percentageComplete == 100) {
      this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: 0 });
    } else {
      this.ngRedux.dispatch({ type: UPDATE_PERCENTAGE_COMPLETE, payload: 20 });
    }
  }
}
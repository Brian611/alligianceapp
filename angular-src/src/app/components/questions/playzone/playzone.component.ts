import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
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
import { validateConfig } from '@angular/router/src/config';

@Component({
    selector: 'app-playzone',
    template: `
    <div>
    <div class="playzone">
    <h1 class="playzone-heading">My Retirement Savings Contribution</h1>
    <div class="chart">
        <div class="chart-container">
            <div id="graph">
               <div [chart]="chart"></div>
            </div>
        </div>
        <div class="panel-container">
            <div class="panel panel-default">
                <div class="panel-heading">feedback</div>
                <div class="panel-body">
                    <p>At age </p>
                    <span class="answer">{{ age }}</span>
                    <br/>
                    <p>Your gross anual income will be</p>
                    <span class="answer">R{{ annualIncome }}</span>
                    <p>Your Total savings would be</p>
                    <span class="answer">R{{ totAnnualContribution }}</span>
                </div>
            </div>
        </div>
        <div class="sliders">
            <div class="row">
                <div class="column left"><label>Up to Age</label></div>
                <div class="column middle"><nouislider style="margin: 0;" [connect]="true" [min]="1" [max]="100" [step]="1" [(ngModel)]="age" [tooltips]="true" [format]="ageFormater" [ngModelOptions]="{standalone: true}"></nouislider></div>
                <div class="column right">
                    <div class="plusminus horiz">
                        <button (click)="minusAge()">-</button>
                            <input type="number" name="age" [(ngModel)]="age" style="width:70px;" max="100" [ngModelOptions]="{standalone: true}" readonly>
                        <button (click)="plusAge()">+</button> 
                    </div>
                </div>
            </div>
            <div class="row">
            <div class="column left"><label>Annual increase</label></div>
            <div class="column middle"><nouislider style="margin: 0;" [connect]="true" [min]="1" [max]="100" [step]="1" [(ngModel)]="increase" [tooltips]="true" [format]="increaseFormater" [ngModelOptions]="{standalone: true}"></nouislider></div>
            <div class="column right"> <div class="plusminus horiz">
            <button (click)="minusAnnualIncrease()">-</button>
                <input type="text" style="width:70px;" name="increase" [(ngModel)]="increase" [ngModelOptions]="{standalone: true}" readonly>
            <button (click)="plusAnnualIncrease()">+</button> 
        </div></div>
        </div>
        <div class="row">
        <div class="column left"><label>Monthly Contribution</label></div>
        <div class="column middle"><nouislider style="margin: 0;" [connect]="true" [min]="1" [max]="1000000" [(ngModel)]="totAnnualContribution" [tooltips]="true" [format]="contributionFormater" [ngModelOptions]="{standalone: true}"></nouislider></div>
        <div class="column right"> <div class="plusminus horiz">
        <button (click)="minusContribution()">-</button>
            <input type="number" style="width:70px;" name="totAnnualContribution" [(ngModel)]="totAnnualContribution" [ngModelOptions]="{standalone: true}" readonly>
        <button (click)="plusContribution()">+</button> 
    </div></div>
    </div>
        </div>
    </div>
    </div>
    </div>
  `,
    styleUrls: ['./playzone.component.css']
})
export class PlayzoneComponent implements OnInit {

    age: number;
    annualIncome: number;
    totAnnualContribution: number;
    increase: number = 6;

    ageFormater: any = {
        to(value: number) {
            return value;
        },
        from(value: number) {
            return value;
        },
        wNumb(decimals: number) {
            return { decimals: 0 };
        }
    }


    increaseFormater: any = {
        to(value: number) {
            return value;
        },
        from(value: number) {
            return value;
        },
        wNumb(decimals: number, thousand: number, prefix: any): any {
            return { decimals: 0, thousand: '', prefix: '%' };
        }
    };

    contributionFormater: any = {
        to(value: number) {
            return value;
        },
        from(value: number) {
            return value;
        },
        wNumb(decimals: number, thousand: number, prefix: any): any {
            return { decimals: 0, thousand: ',', prefix: 'R' };
        }
    };
    private age$: Subscription;
    private annualIncome$: Subscription;
    private totAnnualContribution$: Subscription;

    constructor(private ngRedux: NgRedux<IAppState>) { }

    chart = new Chart({
        chart: {
            type: 'area',
            width: 700,
            height: 280
        },
        title: {
            text: 'Monthly Income Savings'
        },
        xAxis: {
            allowDecimals: false,
            title: {
                text: 'Age'
            },
            labels: {
                formatter: function () {
                    return this.value + 5;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Annual'
            },
            labels: {
                formatter: function () {
                    return 'R' + this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} saved <b>{point.y:,.0f}</b><br/>at the age {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 20,
                pointInterval: 5,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Income',
            data: [30000, 35000, 40000, 45000, 50000, 55000, 58000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000]
        }, {
            name: 'Savings',
            data: [0, 10000, 20000, 30000, 35000, 35500, 40000, 45000, 45500, 50000, 55000, 55500, 60000, 65000, 65500, 70000]
        }]
    });

    ngOnInit() {
        this.age$ = this.ngRedux.select<number>(state => state.age).subscribe(age => { this.age = age; });
        this.annualIncome$ = this.ngRedux.select<number>(state => state.annualIncome).subscribe(annualIncome => { this.annualIncome = annualIncome; });
        this.totAnnualContribution$ = this.ngRedux.select<number>(state => state.totAnnualContribution).subscribe(totAnnualContribution => { this.totAnnualContribution = totAnnualContribution; });
    }

    ngOnDestroy() {
        this.age$.unsubscribe();
        this.annualIncome$.unsubscribe();
        this.totAnnualContribution$.unsubscribe();
    }

    plusAge() {
        this.ngRedux.dispatch({ type: UPDATE_AGE, payload: this.age++ })
    }
    minusAge() {
        this.ngRedux.dispatch({ type: UPDATE_AGE, payload: this.age-- })
    }

    plusAnnualIncrease() {
        console.log("increase", this.increase);
        this.increase++;
    }
    minusAnnualIncrease() {
        this.increase--;
    }

    plusContribution() {
        this.ngRedux.dispatch({ type: UPDATE_TOTAL_ANNUAL_CONTRIBUTION, payload: this.totAnnualContribution + 1000 })
    }
    minusContribution() {
        this.ngRedux.dispatch({ type: UPDATE_TOTAL_ANNUAL_CONTRIBUTION, payload: this.totAnnualContribution - 1000 })
    }
}

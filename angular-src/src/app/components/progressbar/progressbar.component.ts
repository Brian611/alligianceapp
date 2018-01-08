import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  template: `
    <div [ngStyle]="progressbar" [style.width.%]="percentageComplete"></div>
  `,
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  @Input() percentageComplete: number;

  progressbar = {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'background': '#4b7794',
    'height': '24px'
  }
  constructor() { }

  ngOnInit() {
  }

}

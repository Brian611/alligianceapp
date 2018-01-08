import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-footer',
    template: `
    <div>
    <div class="btn-bottom-left" *ngIf="!q1">
    <button class="btn-class" (click)="prevSlide()">
        Back
        <span class="btn-arrow-left">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
        </span>
    </button>
</div>
<div class="btn-bottom-right" *ngIf="!playzone">
    <button type="submit" class="btn-class" (click)="nextSlide()">Next
        <span class="btn-arrow-right">
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </span>
    </button>
</div>
    </div>
  `,
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    @Output() onNext = new EventEmitter();
    @Output() onPrev = new EventEmitter();
    @Input() q1: boolean;
    @Input() playzone: boolean;
    
    constructor() { }

    ngOnInit() {
    }

    nextSlide() {
        this.onNext.emit();
    }

    prevSlide() {
        this.onPrev.emit();
    }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayzoneComponent } from './playzone.component';

describe('PlayzoneComponent', () => {
  let component: PlayzoneComponent;
  let fixture: ComponentFixture<PlayzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

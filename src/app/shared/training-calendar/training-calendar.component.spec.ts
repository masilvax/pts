import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCalendarComponent } from './training-calendar.component';

describe('TrainingCalendarComponent', () => {
  let component: TrainingCalendarComponent;
  let fixture: ComponentFixture<TrainingCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionToolbarComponent } from './training-session-toolbar.component';

describe('TrainingSessionToolbarComponent', () => {
  let component: TrainingSessionToolbarComponent;
  let fixture: ComponentFixture<TrainingSessionToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingSessionToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSessionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsToolbarComponent } from './trainings-toolbar.component';

describe('TrainingsToolbarComponent', () => {
  let component: TrainingsToolbarComponent;
  let fixture: ComponentFixture<TrainingsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

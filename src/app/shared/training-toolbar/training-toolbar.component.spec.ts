import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingToolbarComponent } from './training-toolbar.component';

describe('TrainingToolbarComponent', () => {
  let component: TrainingToolbarComponent;
  let fixture: ComponentFixture<TrainingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

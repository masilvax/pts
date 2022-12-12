import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddExerciseComponent } from './dialog-add-exercise.component';

describe('DialogAddExerciseComponent', () => {
  let component: DialogAddExerciseComponent;
  let fixture: ComponentFixture<DialogAddExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTrainingSessionComponent } from './dialog-add-training-session.component';

describe('DialogAddTrainingSessionComponent', () => {
  let component: DialogAddTrainingSessionComponent;
  let fixture: ComponentFixture<DialogAddTrainingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTrainingSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

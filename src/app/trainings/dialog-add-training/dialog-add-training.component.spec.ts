import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTrainingComponent } from './dialog-add-training.component';

describe('DialogAddTrainingComponent', () => {
  let component: DialogAddTrainingComponent;
  let fixture: ComponentFixture<DialogAddTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

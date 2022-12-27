import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCountdownComponent } from './dialog-countdown.component';

describe('DialogCountdownComponent', () => {
  let component: DialogCountdownComponent;
  let fixture: ComponentFixture<DialogCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCountdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

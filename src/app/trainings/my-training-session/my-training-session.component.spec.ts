import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingSessionComponent } from './my-training-session.component';

describe('MyTrainingSessionComponent', () => {
  let component: MyTrainingSessionComponent;
  let fixture: ComponentFixture<MyTrainingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTrainingSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

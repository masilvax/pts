import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingsToolbarComponent } from './my-trainings-toolbar.component';

describe('MyTrainingsToolbarComponent', () => {
  let component: MyTrainingsToolbarComponent;
  let fixture: ComponentFixture<MyTrainingsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTrainingsToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTrainingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

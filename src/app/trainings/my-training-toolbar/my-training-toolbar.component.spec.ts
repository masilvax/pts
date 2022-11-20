import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingToolbarComponent } from './my-training-toolbar.component';

describe('MyTrainingToolbarComponent', () => {
  let component: MyTrainingToolbarComponent;
  let fixture: ComponentFixture<MyTrainingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTrainingToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTrainingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

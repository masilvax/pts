import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrayComponent } from './user-tray.component';

describe('UserTrayComponent', () => {
  let component: UserTrayComponent;
  let fixture: ComponentFixture<UserTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

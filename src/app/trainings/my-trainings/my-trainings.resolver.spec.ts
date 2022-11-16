import { TestBed } from '@angular/core/testing';

import { MyTrainingsResolver } from './my-trainings.resolver';

describe('MyTrainingsResolver', () => {
  let resolver: MyTrainingsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyTrainingsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

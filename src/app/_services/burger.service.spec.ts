import { TestBed } from '@angular/core/testing';

import { BurgerService } from './burger.service';

describe('BurgerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BurgerService = TestBed.get(BurgerService);
    expect(service).toBeTruthy();
  });
});

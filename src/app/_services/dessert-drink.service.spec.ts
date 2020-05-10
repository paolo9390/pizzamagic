import { TestBed } from '@angular/core/testing';

import { DessertDrinkService } from './dessert-drink.service';

describe('DessertDrinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DessertDrinkService = TestBed.get(DessertDrinkService);
    expect(service).toBeTruthy();
  });
});

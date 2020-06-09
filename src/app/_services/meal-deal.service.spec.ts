import { TestBed } from '@angular/core/testing';

import { MealDealService } from './meal-deal.service';

describe('MealDealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealDealService = TestBed.get(MealDealService);
    expect(service).toBeTruthy();
  });
});

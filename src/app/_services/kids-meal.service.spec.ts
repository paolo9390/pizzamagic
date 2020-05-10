import { TestBed } from '@angular/core/testing';

import { KidsMealService } from './kids-meal.service';

describe('KidsMealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KidsMealService = TestBed.get(KidsMealService);
    expect(service).toBeTruthy();
  });
});

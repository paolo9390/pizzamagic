import { TestBed } from '@angular/core/testing';

import { ShopLocatorService } from './shop-locator.service';

describe('ShopLocatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopLocatorService = TestBed.get(ShopLocatorService);
    expect(service).toBeTruthy();
  });
});

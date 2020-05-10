import { TestBed } from '@angular/core/testing';

import { GarlicBreadService } from './garlic-bread.service';

describe('GarlicBreadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GarlicBreadService = TestBed.get(GarlicBreadService);
    expect(service).toBeTruthy();
  });
});

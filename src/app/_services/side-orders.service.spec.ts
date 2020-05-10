import { TestBed } from '@angular/core/testing';

import { SideOrdersService } from './side-orders.service';

describe('SideOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideOrdersService = TestBed.get(SideOrdersService);
    expect(service).toBeTruthy();
  });
});

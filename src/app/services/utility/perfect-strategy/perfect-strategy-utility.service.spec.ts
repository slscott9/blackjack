import { TestBed } from '@angular/core/testing';

import { PerfectStrategyUtilityService } from './perfect-strategy-utility.service';

describe('PerfectStrategyUtilityService', () => {
  let service: PerfectStrategyUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfectStrategyUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

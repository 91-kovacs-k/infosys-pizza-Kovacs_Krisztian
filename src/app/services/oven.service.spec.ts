import { TestBed } from '@angular/core/testing';

import { OvenService } from './oven.service';

describe('OvenService', () => {
  let service: OvenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OvenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

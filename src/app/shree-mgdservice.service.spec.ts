import { TestBed } from '@angular/core/testing';

import { ShreeMGDServiceService } from './shree-mgdservice.service';

describe('ShreeMGDServiceService', () => {
  let service: ShreeMGDServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShreeMGDServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

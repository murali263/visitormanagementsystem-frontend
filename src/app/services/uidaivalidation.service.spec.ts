import { TestBed } from '@angular/core/testing';

import { UidaivalidationService } from './uidaivalidation.service';

describe('UidaivalidationService', () => {
  let service: UidaivalidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UidaivalidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

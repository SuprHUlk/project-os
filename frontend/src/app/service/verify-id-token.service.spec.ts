import { TestBed } from '@angular/core/testing';

import { VerifyIdTokenService } from './verify-id-token.service';

describe('VerifyIdTokenService', () => {
  let service: VerifyIdTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyIdTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

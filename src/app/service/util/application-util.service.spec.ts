import { TestBed } from '@angular/core/testing';

import { ApplicationUtilService } from './application-util.service';

describe('ApplicationUtilService', () => {
  let service: ApplicationUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

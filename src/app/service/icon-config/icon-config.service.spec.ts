import { TestBed } from '@angular/core/testing';

import { IconConfigService } from './icon-config.service';

describe('IconConfigService', () => {
  let service: IconConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

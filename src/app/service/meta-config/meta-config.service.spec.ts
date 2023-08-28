import { TestBed } from '@angular/core/testing';

import { MetaConfigService } from './meta-config.service';

describe('MetaConfigService', () => {
  let service: MetaConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

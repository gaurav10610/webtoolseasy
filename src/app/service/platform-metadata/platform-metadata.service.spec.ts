import { TestBed } from '@angular/core/testing';

import { PlatformMetadataService } from './platform-metadata.service';

describe('PlatformMetadataService', () => {
  let service: PlatformMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

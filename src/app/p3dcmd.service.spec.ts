import { TestBed } from '@angular/core/testing';

import { P3dcmdService } from './p3dcmd.service';

describe('P3dcmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: P3dcmdService = TestBed.get(P3dcmdService);
    expect(service).toBeTruthy();
  });
});

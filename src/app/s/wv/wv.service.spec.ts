import { TestBed } from '@angular/core/testing';

import { WvService } from './wv.service';

describe('WvService', () => {
  let service: WvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

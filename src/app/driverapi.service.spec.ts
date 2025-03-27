import { TestBed } from '@angular/core/testing';

import { DriverapiService } from './driverapi.service';

describe('DriverapiService', () => {
  let service: DriverapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

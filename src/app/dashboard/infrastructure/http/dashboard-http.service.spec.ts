/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardHttpService } from './dashboard-http.service';

describe('Service: DashboardHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardHttpService]
    });
  });

  it('should ...', inject([DashboardHttpService], (service: DashboardHttpService) => {
    expect(service).toBeTruthy();
  }));
});

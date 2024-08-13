/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsumerHttpService } from './consumer-http.service';

describe('Service: ConsumerHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumerHttpService]
    });
  });

  it('should ...', inject([ConsumerHttpService], (service: ConsumerHttpService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicsHttpService } from './topics-http.service';

describe('Service: TopicsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicsHttpService]
    });
  });

  it('should ...', inject([TopicsHttpService], (service: TopicsHttpService) => {
    expect(service).toBeTruthy();
  }));
});

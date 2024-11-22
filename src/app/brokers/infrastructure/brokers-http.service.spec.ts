import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrokersHttpService } from './brokers-http.service';
import { environment } from '../../../environments/environment';

describe('BrokersHttpService', () => {
  let service: BrokersHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrokersHttpService]
    });

    service = TestBed.inject(BrokersHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select broker successfully', () => {
    const mockBrokerTerm = 'test-broker';
    const expectedUrl = `${environment.url.domain}/platform-kafka-admin/kafka/connect/${mockBrokerTerm}`;
    const mockResponse = 'Broker connected successfully';

    service.selectBroker(mockBrokerTerm).subscribe({
      next: (response) => {
        expect(response).toBe(mockResponse);
      }
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when selecting broker', () => {
    const mockBrokerTerm = 'error-broker';
    const expectedUrl = `${environment.url.domain}/platform-kafka-admin/kafka/connect/${mockBrokerTerm}`;
    const errorMessage = 'Connection failed';

    service.selectBroker(mockBrokerTerm).subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should construct correct URL for broker selection', () => {
    const mockBrokerTerm = 'test-broker';
    const expectedUrl = `${environment.url.domain}/platform-kafka-admin/kafka/connect/${mockBrokerTerm}`;

    service.selectBroker(mockBrokerTerm).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.url).toBe(expectedUrl);
    req.flush('');
  });

  it('should use correct response type', () => {
    const mockBrokerTerm = 'test-broker';
    const expectedUrl = `${environment.url.domain}/platform-kafka-admin/kafka/connect/${mockBrokerTerm}`;

    service.selectBroker(mockBrokerTerm).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.responseType).toBe('text');
    req.flush('');
  });
});
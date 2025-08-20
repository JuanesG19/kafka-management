import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MetricsResponse } from '../../domain/MetricsResponse';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  constructor() {}

  getConsumers(): Observable<number> {
    const url = `${this.url}/consumer-count`;
    return this.http.get<number>(url);
  }

  getTopics(): Observable<number> {
    const url = `${this.url}/topic-count`;
    return this.http.get<number>(url);
  }

  getPartitions(): Observable<number> {
    const url = `${this.url}/partition-count`;
    return this.http.get<number>(url);
  }

  getMetrics(): Observable<MetricsResponse> {
    const url = `${this.url}/api/metrics`;
    return this.http.get<MetricsResponse>(url);
  }
}

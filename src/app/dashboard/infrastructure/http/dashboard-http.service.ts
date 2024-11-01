import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

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

  //getBrokers(): Observable<number> {}
}

import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform/kafka`;

  constructor() {}

  getBrokers(): Observable<number> {
    const url = `${this.url}/consumers/count`;
    return this.http.get<number>(url);
  }

  getTopics(): Observable<number> {
    const url = `${this.url}/topics/count`;
    return this.http.get<number>(url);
  }

  getPartitions(): Observable<number> {
    const url = `${this.url}/topics/test/partitions/count`;
    return this.http.get<number>(url);
  }

  //getBrokers(): Observable<number> {}
}

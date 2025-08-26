import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrokersHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.kafkaBackendDomain}/platform-kafka-admin/kafka`;

  constructor() {}

  selectBroker(term: string): Observable<string> {
    const url = `${this.url}/connect/${term}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

}

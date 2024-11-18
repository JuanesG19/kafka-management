import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IBroker } from '../../shared/domains/IBroker';

@Injectable({
  providedIn: 'root',
})
export class BrokersHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  constructor() {}

  selectBroker(term: string): Observable<IBroker> {
    const url = `${this.url}/connect/${term}`;
    return this.http.get<IBroker>(url);
  }

}

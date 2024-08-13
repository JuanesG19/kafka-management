import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsumerHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform/kafka`;

  constructor() {}

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getConsumers(): Observable<any> {
    const url = `${this.url}/consumers`;
    return this.http.get<any>(url);
  }

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  searchCounsumers(term: string): Observable<any> {
    const url = `${this.url}/consumers/search?searchTerm=${term}`;
    return this.http.get<any>(url);
  }
}

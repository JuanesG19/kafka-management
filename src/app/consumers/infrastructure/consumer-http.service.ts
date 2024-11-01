import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../../shared/domains/ICustomer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsumerHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  constructor() {}

  getConsumers(): Observable<ICustomer[]> {
    const url = `${this.url}/consumers`;
    return this.http.get<ICustomer[]>(url);
  }

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  searchCounsumers(term: string): Observable<ICustomer[]> {
    const url = `${this.url}/consumers/search?searchTerm=${term}`;
    return this.http.get<ICustomer[]>(url);
  }
}

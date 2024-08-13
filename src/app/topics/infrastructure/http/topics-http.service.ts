import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform/kafka`;

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getTopicsByTerm(term: string): Observable<any> {
    const url = `${this.url}/topics/search?searchTerm=${term}`;
    return this.http.get<any>(url);
  }
}

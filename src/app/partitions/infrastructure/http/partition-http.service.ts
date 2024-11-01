import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartitionsHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getPartitions(term : string):Observable<any>{
    const url = `${this.url}/topics/${term}/partitions/details/byTopic`;
    return this.http.get<any>(url);
  }

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getAllPartitions(): Observable<any>{
    const url = `${this.url}/partitions`;
    return this.http.get<any>(url);
  }

  getAllMensajesByTopicAndPartitions(topic:string,partition:string,offset:number,limit:number):Observable<any>{
    const url = `${this.url}/topics/${topic}/partitions/${partition}/messages?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }

}

import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IMessage } from '../../../shared/domains/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  retryMessage(message: any): Observable<any>{
    const url = `${this.url}/logChangeMessage`;
    return this.http.post<IMessage>(url,message);
  }

  getAllMensajesByTopicAndPartitions(topic:string,partition:string,offset:number,limit:number):Observable<any>{
    const url = `${this.url}/topics/${topic}/partitions/${partition}/messages?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }

}

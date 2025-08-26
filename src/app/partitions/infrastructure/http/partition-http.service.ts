import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IPartition } from '../../../shared/domains/IPartition';

@Injectable({
  providedIn: 'root',
})
export class PartitionsHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.kafkaBackendDomain}/platform-kafka-admin/kafka`;

  getPartitions(term : string):Observable<IPartition[]>{
    const url = `${this.url}/topics/${term}/partitions/details/byTopic`;
    return this.http.get<IPartition[]>(url);
  }

  getAllPartitions(): Observable<IPartition[]>{
    const url = `${this.url}/partitions`;
    return this.http.get<IPartition[]>(url);
  }

  getAllMensajesByTopicAndPartitions(topic:string,partition:number,offset:number,limit:number):Observable<any>{
    const url = `${this.url}/topics/${topic}/partitions/${partition}/messages?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }

}

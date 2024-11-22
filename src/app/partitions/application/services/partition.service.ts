import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartitionsHttpService } from '../../infrastructure/http/partition-http.service';
import { IPartition } from '../../../shared/domains/IPartition';

@Injectable({
  providedIn: 'root',
})
export class PartitionsService {
  constructor(private readonly partitionHttpService: PartitionsHttpService) {}

    /* TODO -> Hay que tiparlo cuando se defina el objeto */
    getPartitions(term: string): Observable<IPartition[]> {
      return this.partitionHttpService.getPartitions(term);
    }

    /* TODO -> Hay que tiparlo cuando se defina el objeto */
    getAllPartitions(): Observable<IPartition[]>{
      return this.partitionHttpService.getAllPartitions();
    }

    getAllMensajesByTopicAndPartitions(topic:string,partition:number,offset:number,limit:number): Observable<any>{
      return this.partitionHttpService.getAllMensajesByTopicAndPartitions(topic,partition,offset,limit);
    }

}

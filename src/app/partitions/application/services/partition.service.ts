import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartitionsHttpService } from '../../infrastructure/http/partition-http.service';

@Injectable({
  providedIn: 'root',
})
export class PartitionsService {
  constructor(private partitionHttpService: PartitionsHttpService) {}

    /* TODO -> Hay que tiparlo cuando se defina el objeto */
    getPartition(term: string): Observable<any> {
      return this.partitionHttpService.getPartitions(term);
    }
}

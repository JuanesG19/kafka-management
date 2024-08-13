import { Component, OnInit, signal } from '@angular/core';

import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartitionsService } from '../../application/services/partition.service';

export interface Element {
  nombre: string;
  particiones: number;
  prefered: number;
  replicadas: number;
  otros: number;
}

@Component({
  selector: 'app-partitions',
  templateUrl: './partitions.component.html',
  styleUrls: ['./partitions.component.css'],
  standalone: true,
  imports: [CountCardsComponent, CustomTableComponent],
})
export class PartitionsComponent implements OnInit {
  public elementData = signal<Element[]>([]);
  public columnDefinitions = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'particiones', header: 'Particiones' },
    { key: 'prefered', header: 'Prefered' },
    { key: 'replicadas', header: 'Replicadas' },
    { key: 'otros', header: 'Otros' }];



  constructor(    private route: ActivatedRoute,
    private partitionService : PartitionsService,
      private route2: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const topic = params.get('topic')?? '';
      this.partitionService.getPartition(topic).subscribe({
        next: (res: { [key: string]: any }) => {
          
          const transformedData = Object.keys(res).map((key) => {
            const partition = res[key];
            return {
              nombre: key,  
              particiones: partition.size,
              prefered: partition.leaderNode, 
              replicadas: partition.replicaNodes.length, 
              otros: partition.offlineReplicaNodes.length
            };
          });

          this.elementData.set(transformedData);
        },
      });
      console.log('partitions BY BD', this.elementData());
    });
    
  }

  handleSearch(element: Element) {
    console.log('Selected element:', element);
  }
}

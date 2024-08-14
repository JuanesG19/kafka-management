import { Component, OnInit, signal } from '@angular/core';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartitionsService } from '../../application/services/partition.service';


export interface Element {
  nombre: string;
  size: number;
  lastOffset: number;
  replicaNodes: number;
  leaderNode: string;
  offlineReplicaNodes:number;
  firstOffset: number;
  inSyncReplicaNodes : number;

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
    { key: 'size', header: 'Tamaño' },
    { key: 'lastOffset', header: 'Posición' },
    { key: 'replicaNodes', header: 'Nodos Réplica' },
    { key: 'leaderNode', header: 'BrokerId' },
    { key: 'offlineReplicaNodes', header: 'Nodos Réplica Offline' },
    { key: 'firstOffset', header: 'Inicio' },
    { key: 'inSyncReplicaNodes', header: 'Nodos Replica Sincronizados' }
  ];



  constructor(    private route: ActivatedRoute,
    private partitionService : PartitionsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const topic = params.get('topic')?? '';
      this.partitionService.getPartition(topic).subscribe({
        next: (res: { [key: string]: any }) => {
          
          const transformedData = Object.keys(res).map((key) => {
            const partition = res[key];
            return {
              nombre: key,
              size: partition.size,
              lastOffset: partition.lastOffset,
              replicaNodes: partition.replicaNodes.length,
              leaderNode: partition.leaderNode,
              offlineReplicaNodes: partition.offlineReplicaNodes.length,
              firstOffset: partition.firstOffset,
              inSyncReplicaNodes: partition.inSyncReplicaNodes
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

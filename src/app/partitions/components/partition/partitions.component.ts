import { Component, OnInit, signal } from '@angular/core';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartitionsService } from '../../application/services/partition.service';
import { GlobalLoadingComponent } from '../../../shared/components/globalLoading/components/globalLoading/globalLoading.component';


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
  imports: [CountCardsComponent, CustomTableComponent,GlobalLoadingComponent],
})
export class PartitionsComponent implements OnInit {
  public idTopic = signal<string>('');
  public elementData = signal<Element[]>([]);
  public loading = signal<boolean>(true);

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
    console.log("ENTRA A LAS PARTICIONES")
    this.loading.set(true);
    this.route.paramMap.subscribe((params) => {
      const topic = params.get('topic')?? '';


      if(topic == ''){
        this.idTopic.set('General');
        this.generalSearch();
      }else{
        this.searchPartitionByTopic(topic);
      }

      console.log('partitions BY BD', this.elementData());
    }); 
  }


  generalSearch(){
    this.partitionService.getAllPartitions().subscribe({
      next: (res: { [key: string]: any }) => {
        console.log(res)
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
      complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
    });
  }

  searchPartitionByTopic(topic: string){
      this.partitionService.getPartitions(topic).subscribe({
        next: (res: { [key: string]: any }) => {
          console.log(res)
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
        complete: () => this.loading.set(false),
          error: () => this.loading.set(false),
      });
    
  }

  handleSearch(element: Element) {
    console.log('Selected element:', element);
  }
}

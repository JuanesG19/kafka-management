import { Component, OnInit, signal } from '@angular/core';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartitionsService } from '../../application/services/partition.service';
import { GlobalLoadingComponent } from '../../../shared/components/globalLoading/components/globalLoading/globalLoading.component';
import { IMessage } from '../../../shared/domains/IMessage';
import { MessagesComponent } from '../../../messages/messages.component';
import { MatDialog } from '@angular/material/dialog';

export interface Element {
  nombre: string;
  size: number;
  topicName: string;
  lastOffset: number;
  replicaNodes: number;
  leaderNode: string;
  offlineReplicaNodes: number;
  firstOffset: number;
  inSyncReplicaNodes: number;
}

@Component({
  selector: 'app-partitions',
  templateUrl: './partitions.component.html',
  styleUrls: ['./partitions.component.css'],
  standalone: true,
  imports: [CountCardsComponent, CustomTableComponent, GlobalLoadingComponent],
})
export class PartitionsComponent implements OnInit {
  public idTopic = signal<string>('');
  public elementData = signal<Element[]>([]);
  public loading = signal<boolean>(true);

  public columnDefinitions = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'size', header: '# Mensajes' },
    { key: 'topicName', header: 'Nombre del Topic' },
    { key: 'lastOffset', header: 'Posición' },
    { key: 'replicaNodes', header: 'Nodos Réplica' },
    { key: 'leaderNode', header: 'BrokerId' },
    { key: 'offlineReplicaNodes', header: 'Nodos Réplica Offline' },
    { key: 'firstOffset', header: 'Inicio' },
    { key: 'inSyncReplicaNodes', header: 'Nodos Replica Sincronizados' },
  ];

  public actions = [
    {
      label: 'Search',
      icon: 'search',
      class: 'text-primary',
      handler: (element: Element) => this.handleSearch(element),
    },
    {
      label: 'Mensajes por Topic',
      icon: 'mail',
      class: 'text-primary',
      handler: (element: Element) => this.handleSeeMessage(element),
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private partitionService: PartitionsService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.route.paramMap.subscribe((params) => {
      const topic = params.get('topic') ?? '';

      if (topic == '') {
        this.idTopic.set('General');
        this.generalSearch();
      } else {
        this.searchPartitionByTopic(topic);
      }

      console.log('partitions BY BD', this.elementData());
    });
  }

  generalSearch() {
    this.partitionService.getAllPartitions().subscribe({
      next: (res: { [key: string]: any }) => {
        const transformedData = Object.keys(res).map((key) => {
          const partition = res[key];
          return {
            nombre: key,
            size: partition.size,
            topicName: partition.topicName,
            lastOffset: partition.lastOffset,
            replicaNodes: partition.replicaNodes.length,
            leaderNode: partition.leaderNode,
            offlineReplicaNodes: partition.offlineReplicaNodes.length,
            firstOffset: partition.firstOffset,
            inSyncReplicaNodes: partition.inSyncReplicaNodes,
          };
        });
        this.elementData.set(transformedData);
      },
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  searchPartitionByTopic(topic: string) {
    this.partitionService.getPartitions(topic).subscribe({
      next: (res: { [key: string]: any }) => {
        console.log(res);
        const transformedData = Object.keys(res).map((key) => {
          const partition = res[key];
          return {
            nombre: key,
            size: partition.size,
            topicName: partition.topicName,
            lastOffset: partition.lastOffset,
            replicaNodes: partition.replicaNodes.length,
            leaderNode: partition.leaderNode,
            offlineReplicaNodes: partition.offlineReplicaNodes.length,
            firstOffset: partition.firstOffset,
            inSyncReplicaNodes: partition.inSyncReplicaNodes,
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

  handleSeeMessage(element: Element){
    this.partitionService.getAllMensajesByTopicAndPartitions(element.topicName,element.nombre,0,10).subscribe({
      next: (messages: IMessage[]) => {
        console.log(messages);
        this.dialog.open(MessagesComponent, {
          width: '90%',
          maxWidth: '1200px',
          data: {
            topicName: element.topicName,
            messages: messages
          }
        });
        console.log(messages);
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }
}

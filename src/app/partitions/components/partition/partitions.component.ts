import { Component, OnInit, signal } from '@angular/core';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ActivatedRoute } from '@angular/router';
import { PartitionsService } from '../../application/services/partition.service';
import { GlobalLoadingComponent } from '../../../shared/components/globalLoading/components/globalLoading/globalLoading.component';
import { IMessage } from '../../../shared/domains/IMessage';
import { MessagesComponent } from '../../../messages/components/messages/messages.component';
import { MatDialog } from '@angular/material/dialog';
import { IPartition } from '../../../shared/domains/IPartition';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-partitions',
    standalone: true,
    templateUrl: './partitions.component.html',
    styleUrls: ['./partitions.component.css'],
    imports: [CountCardsComponent, CustomTableComponent, GlobalLoadingComponent]
})
export class PartitionsComponent implements OnInit {
  public idTopic = signal<string>('');
  public elementData = signal<IPartition[]>([]);
  public loading = signal<boolean>(true);
  lastSelectedPartition: IPartition | null = null;


  currentPagination: { pageIndex: number; pageSize: number } = { pageIndex: 0, pageSize: 10 };

onPageChanged(event: PageEvent) {
  this.currentPagination.pageIndex = event.pageIndex;
  this.currentPagination.pageSize = event.pageSize;
}

  public columnDefinitions = [
    { key: 'partitionName', header: 'Name' },
    { key: 'size', header: '# Messages' },
    { key: 'topicName', header: 'Topic Name' },
    { key: 'lastOffset', header: 'Last Offset' },
    { key: 'replicaNodes', header: 'Replica Nodes' },
    { key: 'leaderNode', header: 'Leader Node' },
    { key: 'offlineReplicaNodes', header: 'Offline Replica Nodes' },
    { key: 'firstOffset', header: 'First Offset' },
    { key: 'inSyncReplicaNodes', header: 'In Sync Replica Nodes' },
  ];

  public actions = [
    {
      label: 'Messages By Topic',
      icon: 'mail',
      class: 'text-primary',
      handler: (element: IPartition) => this.handleSeeMessage(element),
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly partitionService: PartitionsService,
    private readonly dialog: MatDialog 
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
      next: (res: IPartition[]) => {
        this.elementData.set(res);
      },
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  searchPartitionByTopic(topic: string) {
    this.partitionService.getPartitions(topic).subscribe({
      next: (res: IPartition[]) => {
        this.elementData.set(res);
      },
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  handleSearch(element: IPartition) {
    console.log('Selected element:', element);
  }

  handleSeeMessage(element: IPartition) {
    this.lastSelectedPartition = element; 
    this.fetchMessages();
  }

  fetchMessages() {
  if (!this.lastSelectedPartition) return; 

  const { pageIndex, pageSize } = this.currentPagination;

  this.partitionService
    .getAllMensajesByTopicAndPartitions(
      this.lastSelectedPartition.topicName,
      this.lastSelectedPartition.partitionName,
      pageIndex,
      pageSize
    )
    .subscribe({
      next: (messages: IMessage[]) => {
        this.dialog.open(MessagesComponent, {
          width: '90%',
          maxWidth: '1200px',
          data: {
            topicName: this.lastSelectedPartition?.topicName,
            messages: messages,
          },
        });
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      },
    });
}
}

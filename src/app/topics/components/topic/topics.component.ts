import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { GlobalLoadingComponent } from '../../../shared/components/globalLoading/components/globalLoading/globalLoading.component';
import { ITopic } from '../../../shared/domains/ITopic';
import { TopicsService } from '../../application/services/topics.service';
import { MessagesComponent } from '../../../messages/components/messages/messages.component';
import { IMessage } from '../../../shared/domains/IMessage';
import { PageEvent } from '@angular/material/paginator';

export interface Element {
  topicName: string;
}

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css'],
    imports: [CountCardsComponent, CustomTableComponent, GlobalLoadingComponent]
})
export class TopicsComponent implements OnInit {
  currentPagination: { pageIndex: number; pageSize: number } = {
    pageIndex: 0,
    pageSize: 10,
  };

  onPageChanged(event: PageEvent) {
    this.currentPagination.pageIndex = event.pageIndex;
    this.currentPagination.pageSize = event.pageSize;
  }

  public idConsumer = signal<string>('');
  public elementData = signal<ITopic[]>([]);
  public loading = signal<boolean>(true);

  public columnDefinitions = [
    { key: 'topicName', header: 'topicName' },
    { key: 'totalPartitions', header: 'totalPartitions' },
    { key: 'totalMessages', header: 'totalMessages' },
    { key: 'consumerGroup', header: 'consumers' },
  ];

  public actions: any[] = [
    {
      label: 'Search',
      icon: 'search',
      class: 'text-primary',
      handler: (element: ITopic) => this.handleSearch(element),
    },
    {
      label: 'SeeMessages',
      icon: 'mail',
      class: 'text-primary',
      handler: (element: ITopic) => this.handleSeeMessage(element),
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly topicsService: TopicsService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.route.paramMap.subscribe((params) => this.handleRouteParams(params));
  }

  private handleRouteParams(params: any) {
    const consumer = params.get('consumer') ?? '';
    console.log('CONSUMER PARAM', consumer);

    if (consumer === '') {
      this.idConsumer.set('General');
      this.generalSearch();
    } else {
      this.idConsumer.set(consumer);
      this.fetchTopicsByConsumer(consumer);
    }
  }

  private fetchTopicsByConsumer(consumer: string) {
    this.topicsService.getTopicsByTerm(consumer).subscribe({
      next: (res: ITopic[]) => this.transformAndSetData(res),
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  private transformAndSetData(res: ITopic[]) {
    const transformedData = res.map((topic) => ({
      ...topic,
      consumerGroup: this.getConsumerGroupString(topic.consumers),
    }));
    this.elementData.set(transformedData);
    console.log('TOPICS BY BD', this.elementData());
  }

  private getConsumerGroupString(consumers: any[]) {
    return consumers.length > 0
      ? consumers.map((consumer) => consumer.consumerGroup).join(', ')
      : '';
  }

  generalSearch() {
    this.topicsService.getTopics().subscribe({
      next: (res: ITopic[]) => this.transformAndSetData(res),
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  handleSearch(element: Element) {
    this.router.navigate(['/partitions', element.topicName]);
    console.log('Selected element:', element);
  }

  handleSeeMessage(element: ITopic) {
    this.topicsService.getMessagesByTopic(element.topicName, 0, 10).subscribe({
      next: (messages: IMessage[]) =>
        this.openMessagesDialog(element.topicName, messages),
      error: (error) => {
        console.error('Error fetching messages:', error);
      },
    });
  }

  private openMessagesDialog(topicName: string, messages: IMessage[]) {
    this.dialog.open(MessagesComponent, {
      width: '90%',
      maxWidth: '1200px',
      data: {
        topicName: topicName,
        messages: messages,
      },
    });
    console.log(messages);
  }
}

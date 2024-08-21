import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';

import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { GlobalLoadingComponent } from '../../../shared/components/globalLoading/components/globalLoading/globalLoading.component';
import { ITopic } from '../../../shared/domains/ITopic';
import { TopicsService } from '../../application/services/topics.service';

export interface Element {
  name: string;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  standalone: true,
  imports: [CountCardsComponent, CustomTableComponent, GlobalLoadingComponent],
})
export class TopicsComponent implements OnInit {
  public idConsumer = signal<string>('');
  public elementData = signal<ITopic[]>([]);
  public loading = signal<boolean>(true);

  public columnDefinitions = [
    { key: 'topicName', header: 'topicName' },
    { key: 'totalPartitions', header: 'totalPartitions' },
    { key: 'totalMessages', header: 'totalMessages' },
    { key: 'consumers', header: 'consumers' },
  ];

  constructor(
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.route.paramMap.subscribe((params) => {
      const consumer = params.get('consumer') ?? '';
      console.log('CONSUMER PARAM', consumer);

      if (consumer == '') {
        this.idConsumer.set('General');
        this.generalSearch();
      } else {
        this.idConsumer.set(consumer);
        this.topicsService.getTopicsByTerm(consumer).subscribe({
          next: (res: ITopic[]) => {
            this.elementData.set(res);
          },
          complete: () => this.loading.set(false),
          error: () => this.loading.set(false),
        });
      }
      console.log('TOPICS BY BD', this.elementData());
    });
  }

  generalSearch() {
    this.topicsService.getTopics().subscribe({
      next: (res: ITopic[]) => {
        this.elementData.set(res);
      },
      complete: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  handleSearch(element: Element) {
    this.router.navigate(['/partitions', element.name]);
    //console.log('Selected element:', element);
  }
}

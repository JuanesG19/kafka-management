import { Component, OnInit, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { TopicsService } from '../../application/services/topics.service';

export interface Element {
  name: string;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  standalone: true,
  imports: [CountCardsComponent, CustomTableComponent],
})
export class TopicsComponent implements OnInit {
  public idConsumer = signal<string>('');
  public elementData = signal<Element[]>([]);
  public columnDefinitions = [{ key: 'name', header: 'Nombre' }];

  constructor(
    private route: ActivatedRoute,
    private topicsService: TopicsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const consumer = params.get('consumer') ?? '';
      this.idConsumer.set(consumer);
      this.topicsService.getTopicsByTerm('b').subscribe({
        next: (res: string[]) => {
          const transformedData = res.map((item) => ({
            name: item,
          }));

          this.elementData.set(transformedData);
        },
      });
      console.log('TOPICS BY BD', this.elementData());
    });
  }

  handleSearch(element: Element) {
    console.log('Selected element:', element);
  }
}

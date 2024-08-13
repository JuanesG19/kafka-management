import { Component, OnInit, signal } from '@angular/core';

import { ConsumerService } from '../../application/consumer.service';
import { CountCardsComponent } from '../../../shared/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/customTable/components/customTable/customTable.component';

export interface Element {
  name: string;
}

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css'],
  standalone: true,
  imports: [CountCardsComponent, CustomTableComponent],
})
export class ConsumersComponent implements OnInit {
  public elementData = signal<Element[]>([]);
  public columnDefinitions = [{ key: 'name', header: 'Nombre' }];

  constructor(private consumerService: ConsumerService) {}

  ngOnInit() {
    this.getConsumers();
  }

  getConsumers() {
    this.consumerService.getConsumers().subscribe({
      next: (res: string[]) => {
        const transformedData = res.map((item) => ({
          name: item,
        }));

        this.elementData.set(transformedData);
      },
    });
  }

  handleSearch(element: Element) {
    console.log('Selected element:', element);
  }
}

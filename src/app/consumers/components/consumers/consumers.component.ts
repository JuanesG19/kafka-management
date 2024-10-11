import { Component, OnInit, signal } from '@angular/core';

import { ConsumerService } from '../../application/consumer.service';
import { CountCardsComponent } from '../../../shared/components/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { ICustomer } from '../../../shared/domains/ICustomer';
import { Router } from '@angular/router';

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
  public columnDefinitions = [
    { key: 'name', header: 'Nombre' },
    { key: 'topicCount', header: 'topicCount' },
    { key: 'memberCount', header: 'memberCount' },
    { key: 'active', header: 'active' },
  ];

  public actions = [
    {
      label: 'Search',
      icon: 'search',
      class: 'text-primary',
      handler: (element: ICustomer) => this.handleSearch(element),
    },
  ];

  constructor(
    private consumerService: ConsumerService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getConsumers();
  }

  getConsumers() {
    this.consumerService.getConsumers().subscribe({
      next: (res: ICustomer[]) => {
        this.elementData.set(res);
        console.log('getConsumers', this.elementData());
      },
    });
  }

  handleSearch(element: Element) {
    this.route.navigate(['/topics', element.name]);
    console.log('Selected element:', element);
  }
}

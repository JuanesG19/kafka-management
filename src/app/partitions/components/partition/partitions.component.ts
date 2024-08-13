import { Component, OnInit } from '@angular/core';

import { CountCardsComponent } from '../../../shared/countCards/components/countCards/countCards.component';
import { CustomTableComponent } from '../../../shared/customTable/components/customTable/customTable.component';

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
  constructor() {}

  ngOnInit() {}

  elementData: Element[] = [
    { nombre: 'Juan', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Pedro', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Luisa', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Marco', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Marco 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Juan 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Pedro 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Luisa 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Marco 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Pedro 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Luisa 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Juan 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Marco 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Luisa 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
    { nombre: 'Juan 1', particiones: 1, prefered: 2, replicadas: 3, otros: 4 },
    { nombre: 'Pedro 2', particiones: 5, prefered: 6, replicadas: 7, otros: 8 },
  ];

  columnDefinitions = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'particiones', header: 'Particiones' },
    { key: 'prefered', header: 'Prefered' },
    { key: 'replicadas', header: 'Replicadas' },
    { key: 'otros', header: 'Otros' },
  ];

  handleSearch(element: Element) {
    console.log('Selected element:', element);
  }
}

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Column {
  key: string;
  header: string;
}

@Component({
  selector: 'app-customTable',
  templateUrl: './customTable.component.html',
  styleUrls: ['./customTable.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class CustomTableComponent implements OnInit, AfterViewInit {
  private _data: any[] = [];

  @Input() set data(value: any[]) {
    this._data = value;
    this.dataSource.data = [...this._data];
  }

  get data(): any[] {
    return this._data;
  }

  @Input() columns: Column[] = [];
  @Input() columnName: string = '-';
  @Output() search = new EventEmitter<any>();
  @Input() paginationOptions: { pageSize: number; pageSizeOptions: number[] } = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25],
  };

  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    console.log('Página cambiada', event); // Debug para asegurarte de que el evento se dispara
    this.pageChange.emit(event);
  }

  @Input() actions: any[] = [];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.displayedColumns = [...this.columns.map((col) => col.key)];
  if (this.actions && this.actions.length > 0) {
    this.displayedColumns.push('actions');
  }
  this.dataSource.data = this.data;

  console.log(this.dataSource.data)
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSearch(element: any) {
    this.search.emit(element);
  }

  onSeeMessages(element: any) {
    
  }

  onDelete(element: any) {
    
  }
}

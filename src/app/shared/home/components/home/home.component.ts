import { Component, OnInit } from '@angular/core';

import { DashboardComponent } from '../../../../dashboard/components/dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [DashboardComponent],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}

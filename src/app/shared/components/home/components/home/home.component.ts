import { Component} from '@angular/core';
import {  DashboardComponent } from "../../../../../dashboard/components/dashboard/dashboard.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [DashboardComponent],
})
export class HomeComponent  {
  constructor() {}

}

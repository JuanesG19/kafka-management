import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DashboardComponent } from '../../../../dashboard/components/dashboard/dashboard.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    NavbarComponent,
    FooterComponent,
    MatIconModule,
    MatDividerModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DashboardComponent,
  ],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

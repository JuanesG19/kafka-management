import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../../../../dashboard/components/dashboard/dashboard.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';
import {MatListModule} from '@angular/material/list';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  action?: () => void;
  disabled?: boolean;
  children?: MenuItem[]; 
  badge?: number;        
}

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
    MatListModule,
  ],
})
export class LayoutComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Home',
      route: '/home'
    },
    {
      icon: 'groups',
      label: 'Consumers',
      route: '/consumers'
    },
    {
      icon: 'format_list_bulleted',
      label: 'Topics',
      route: '/topics'
    },
    {
      icon: 'view_module',
      label: 'Partitions',
      route: '/partitions'
    },
    {
      icon: 'dns',
      label: 'Change Broker',
      route: '/home',
      action: () => this.changeBroker()
    }
  ];

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  changeBroker(){
    localStorage.removeItem("broker");
    this.router.navigate(['/home']);
    location.reload();  
  }
}

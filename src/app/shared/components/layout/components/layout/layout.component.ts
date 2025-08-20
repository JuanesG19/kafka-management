import { Component, ViewChild} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
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
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        FooterComponent,
        NavbarComponent,
        MatIconModule,
        MatDividerModule,
        RouterOutlet,
        RouterLink,
        MatListModule,
    ]
})
export class LayoutComponent  {

    @ViewChild('drawer') drawer!: MatDrawer;

    
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

  changeBroker(){
    localStorage.removeItem("broker");
    this.router.navigate(['/home']);
    location.reload();  
  }

  onMouseMove(event: MouseEvent): void {
    const leftEdgeThreshold = 20;
    
    if (event.clientX <= leftEdgeThreshold) {
      if (!this.drawer.opened) {
        this.drawer.open();
      }
    }
  }
}

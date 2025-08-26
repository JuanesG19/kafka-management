import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { AuthKeycloackService } from '../../../../auth/application/services/auth-keycloack.service';
import { MatDialog } from '@angular/material/dialog';
import { BrokersComponent } from '../../../../../brokers/components/broker/brokers.component';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
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
export class LayoutComponent implements OnInit {
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
      action: () => this.openBrokerDialog()
    }
  ];
  userName: string = '';
  userEmail: string = '';

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getEmail();
  }


  constructor(private readonly router: Router, private readonly authService: AuthKeycloackService, private readonly dialog: MatDialog) { }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['']);
    this.authService.logout();
  }

  onMouseMove(event: MouseEvent): void {
    const leftEdgeThreshold = 20;

    if (event.clientX <= leftEdgeThreshold) {
      if (!this.drawer.opened) {
        this.drawer.open();
      }
    }
  }

  openBrokerDialog(): void {
    const dialogRef = this.dialog.open(BrokersComponent, {
      width: '420px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('Broker cambiado con éxito:', result.code);
        // aquí podrías refrescar la vista o recargar datos
      }
    });
  }
}

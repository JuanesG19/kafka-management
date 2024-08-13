import { AuthGuard } from './shared/auth/application/guard/AuthGuard';
import { BrokersComponent } from './brokers/components/broker/brokers.component';
import { ConsumersComponent } from './consumers/components/consumers/consumers.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/components/layout/layout.component';
import { LoginComponent } from './shared/components/login/components/login/login.component';
import { PartitionsComponent } from './partitions/components/partition/partitions.component';
import { Routes } from '@angular/router';
import { TopicsComponent } from './topics/components/topic/topics.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'consumers', component: ConsumersComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'brokers', component: BrokersComponent },
      { path: 'partitions', component: PartitionsComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];

import { Component, Input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-globalLoading',
  templateUrl: './globalLoading.component.html',
  styleUrls: ['./globalLoading.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class GlobalLoadingComponent {
  @Input() isLoading: boolean = false;
}

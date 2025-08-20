import { Component, Input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-globalLoading',
    standalone: true,
    templateUrl: './globalLoading.component.html',
    styleUrls: ['./globalLoading.component.css'],
    imports: [MatProgressSpinnerModule]
})
export class GlobalLoadingComponent {
  @Input() isLoading: boolean = false;
}

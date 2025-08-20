import { Component, signal } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [MatToolbarModule]
})
export class FooterComponent {
  public currentYear = signal<number>(new Date().getFullYear());

  constructor() { }
}

import { Component} from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [MatToolbarModule],
})
export class FooterComponent  {
  constructor() {}
}

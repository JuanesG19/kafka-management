import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokersHttpService } from '../../infrastructure/brokers-http.service';
import { MatDialog } from '@angular/material/dialog';
import { BrokersComponent } from '../../components/broker/brokers.component';

@Injectable({
  providedIn: 'root',
})
export class BrokersService {
  constructor(
    private readonly brokersHttpService: BrokersHttpService,
    private readonly dialog: MatDialog
  ) { }

  selectBroker(term: string): Observable<string> {
    return this.brokersHttpService.selectBroker(term);
  }

  checkBroker(): void {
    if (!localStorage.getItem('broker')) {
      this.openBrokerDialog();
    }
  }

  private openBrokerDialog(): void {
    const dialogRef = this.dialog.open(BrokersComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        console.log(result)
      } else {
        setTimeout(() => {
          this.openBrokerDialog();
        }, 100);
      }
    });
  }
}

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../components/customModal/components/customModal/customModal.component';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  public inactivityTime: number = environment.famiWS02.inactivityTime;
  public inactivity = new BehaviorSubject<boolean>(false);

  private timerSubscription: Subscription | null = null;

  constructor(
    private readonly ngZone: NgZone,
    private dialog: MatDialog
  ) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.resetTimer.bind(this));
      window.addEventListener('keypress', this.resetTimer.bind(this));
    });

    this.startTimer();
  }

  startTimer() {
    if (!localStorage.getItem(environment.famiWS02.localStorageToken)) {
      return;
    }

    this.stopTimer(); 

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.resetTimer);
      window.addEventListener('keypress', this.resetTimer);
    });

    this.timerSubscription = timer(this.inactivityTime).subscribe(() => {
      this.ngZone.run(() => {
        this.inactivity.next(true);
        this.deleteUserData();

        this.dialog.open(CustomModalComponent, {
          data: {
            title: 'Important Warning',
            message: 'Inactivity timeout. Please log in again.',
          },
          disableClose: true,
        }).afterClosed().subscribe(() => {
          this.redirectUrl('/login');
        });
      });
    });
  }


  resetTimer = () => {
    this.inactivity.next(false);
    this.startTimer();
  };

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }

    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('keypress', this.resetTimer);
  }

  isActive(): Observable<boolean> {
    return this.inactivity.asObservable();
  }

  redirectUrl(url: string) {
    window.location.href = url;
  }

  deleteUserData() {
    localStorage.removeItem(environment.famiWS02.localStorageToken);
  }
}

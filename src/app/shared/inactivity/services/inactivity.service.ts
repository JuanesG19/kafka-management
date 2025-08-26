import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../components/customModal/components/customModal/customModal.component';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  public inactivityTime: number = environment.keycloack.inactivityTime;
  public inactivity = new BehaviorSubject<boolean>(false);

  private timerSubscription: Subscription | undefined;

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
    if (localStorage.getItem(environment.keycloack.localStorageToken) != null) {

      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }

      this.timerSubscription = timer(this.inactivityTime).subscribe(() => {
        this.ngZone.run(() => {
          this.inactivity.next(true);
          this.deleteUserData();
          this.dialog.open(CustomModalComponent, {
            data: {
              title: 'Aviso Importante',
              message: 'Tiempo de inactividad excedido. Por favor, vuelve a iniciar sesión.',
            },
            disableClose: true
          }).afterClosed().subscribe(() => {
            this.redirectUrl('/login');
          });;
        });
      });
    }
  }

  resetTimer() {
    this.inactivity.next(false);
    this.startTimer();
  }

  isActive(): Observable<boolean> {
    return this.inactivity.asObservable();
  }

  redirectUrl(url: string) {
    window.location.href = url;
  }

  deleteUserData() {
    localStorage.removeItem(environment.keycloack.localStorageToken);
  }
}

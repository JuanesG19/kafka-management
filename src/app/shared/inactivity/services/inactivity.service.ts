import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  public inactivityTime: number = environment.keycloack.inactivityTime;
  public inactivity = new BehaviorSubject<boolean>(false);

  private timerSubscription: Subscription | undefined;

  constructor(
    private readonly ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.resetTimer.bind(this));
      window.addEventListener('keypress', this.resetTimer.bind(this));
    });

    this.startTimer();
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(this.inactivityTime).subscribe(() => {
      this.ngZone.run(() => {
        this.inactivity.next(true);
        this.deleteUserData();
        alert('Has estado inactivo por un tiempo prolongado. Por favor, inicia sesión nuevamente.');
        this.redirectUrl(environment.url.domain);
        
      });
    });
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

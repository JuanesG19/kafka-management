import { Injectable } from "@angular/core"
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root",
})
export class BrokerMonitorService {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly _snackBar: MatSnackBar) { }

  startMonitoring(): void {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      const broker = localStorage.getItem("broker");
      if (!broker) {
        this.showBrokerError()
      }
    }, 2000)
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private showBrokerError(): void {
    this._snackBar.open(
      "You are not connected to any broker",
      "Ok",
      {
        duration: 5000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
      }
    );
  }
}

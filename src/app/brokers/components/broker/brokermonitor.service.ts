import { Injectable } from "@angular/core"
import { ToastrService } from "ngx-toastr"

@Injectable({
  providedIn: "root",
})
export class BrokerMonitorService {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private toastr: ToastrService) {}

  startMonitoring(): void {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      const broker = localStorage.getItem("broker")
      if (!broker) {
        this.showBrokerError()
      }
    }, 5000)
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private showBrokerError(): void {
    this.toastr.error("You are not connected to any broker", "Connection Error", {
      timeOut: 10000,
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-center",
    })
  }
}

import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { TokenStoreService } from "../services/token-store.service"

@Injectable({ providedIn: "root" })
export class AuthSyncService {
  private channel = new BroadcastChannel("auth_channel")
  private sessionId: string

  constructor(
    private tokenStore: TokenStoreService,
    private router: Router,
  ) {
    this.sessionId = Math.random().toString(36).substring(2, 15)

    this.channel.onmessage = (ev) => {
      const { type, sessionId } = ev.data ?? {}

      if (sessionId === this.sessionId) return

      if (type === "login") {
        this.router.navigate(["/home"])
      }

      if (type === "logout") {
        this.tokenStore.clearTokens()
        this.router.navigate(["/login"])
      }
    }
  }

  announceLogin(): void {
    this.channel.postMessage({ type: "login", sessionId: this.sessionId })
  }

  announceLogout(): void {
    this.channel.postMessage({ type: "logout", sessionId: this.sessionId })
  }
}

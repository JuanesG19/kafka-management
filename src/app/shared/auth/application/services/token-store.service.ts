import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class TokenStoreService {
  private _accessToken: string | null = null
  private readonly STORAGE_KEY = "auth_token"

  setTokens(accessToken: string | null) {
    this._accessToken = accessToken

    if (accessToken) {
      localStorage.setItem(this.STORAGE_KEY, accessToken)
    } else {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  getAccessToken(): string | null {
    if (this._accessToken) {
      return this._accessToken
    }

    const token = localStorage.getItem(this.STORAGE_KEY)
    this._accessToken = token
    return token
  }

  clearTokens() {
    this._accessToken = null
    localStorage.removeItem(this.STORAGE_KEY)
  }

  isSessionActive(): boolean {
    return this.getAccessToken() !== null
  }
}

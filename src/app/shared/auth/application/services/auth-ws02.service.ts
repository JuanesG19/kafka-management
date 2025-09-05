import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { ISession } from "../../domain/ISession"
import { AuthKeycloackHttpService } from "../../infrastructure/http/auth-keycloack-http.service"
import { jwtDecode } from "jwt-decode"
import { Router } from "@angular/router"
import { TokenStoreService } from "./token-store.service"
import { environment } from "../../../../../environments/environment"

export interface DecodedToken {
  name: string
  email: string
  given_name?: string
  family_name?: string
  exp: number
  [key: string]: any
}

@Injectable({ providedIn: "root" })
export class AuthKeycloackService {

  constructor(
    private readonly authKeycloackHttpService: AuthKeycloackHttpService,
    private readonly router: Router,
    private readonly tokenStore: TokenStoreService,
  ) {

  }

  getKeycloakTokenService(sessionData: ISession): Observable<string> {
    const { username, password } = sessionData

    return this.authKeycloackHttpService.getWs02Token(username, password).pipe(
      map((responseToken) => {
        if (!responseToken?.access_token) {
          throw new Error("Error al obtener el access token")
        }

        this.setSession(responseToken.access_token)
        return responseToken.access_token
      }),
    )
  }

  private setSession(accessToken: string): void {
    this.tokenStore.setTokens(accessToken)
  }

  logout(): void {
    this.tokenStore.clearTokens()
  }

  isLoggedIn(): boolean {
    const token = this.tokenStore.getAccessToken();
    console.log('Token from store:', token);

    const valid = !!token && !this.isTokenExpired(token);
    console.log('isLoggedIn result:', valid);
    return valid;
  }

  isTokenExpired(token?: string): boolean {
    token = token ?? this.tokenStore.getAccessToken() ?? ""
    if (!token) return true

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log('Decoded token:', decoded);
      const now = Math.floor(Date.now() / 1000);
      console.log('exp:', decoded.exp, 'now:', now);
      return decoded.exp < now;
    } catch (e) {
      console.error('Error decoding token:', e);
      return true;
    }
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.tokenStore.getAccessToken()
    if (!token) return null
    try {
      return jwtDecode<DecodedToken>(token)
    } catch {
      return null
    }
  }

  getUserName(): string {
    return this.getDecodedToken()?.name ?? "Usuario"
  }

  getEmail(): string {
    return this.getDecodedToken()?.email ?? ""
  }
}

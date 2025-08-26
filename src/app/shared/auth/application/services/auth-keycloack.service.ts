import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ISession } from '../../domain/ISession';
import { AuthKeycloackHttpService } from '../../infrastructure/http/auth-keycloack-http.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

export interface DecodedToken {
    name: string;
    email: string;
    given_name?: string;
    family_name?: string;
    exp: number;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class AuthKeycloackService {
    private logoutTimer: any;

    constructor(private readonly authKeycloackHttpService: AuthKeycloackHttpService, private readonly router: Router) { }

    getKeycloakTokenService(sessionData: ISession): Observable<string> {
        const userData: string = sessionData.username;
        const userPassword: string = sessionData.password;

        // 🚨 Login manual → borro token previo
        localStorage.removeItem(environment.keycloack.localStorageToken);

        return this.authKeycloackHttpService
            .getKeycloakToken(userData, userPassword)
            .pipe(
                map(responseToken => {
                    if (!responseToken || !responseToken.access_token) {
                        throw new Error('Error al obtener el token');
                    }
                    const token = responseToken.access_token;

                    this.setSession(token); 

                    return token;
                })
            );
    }
    private setSession(token: string): void {
        localStorage.setItem(environment.keycloack.localStorageToken, token);

        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const now = Math.floor(Date.now() / 1000);
            const expiresInMs = (decoded.exp - now) * 1000;

            if (expiresInMs > 0) {
                this.logoutTimer = setTimeout(() => {
                    this.logout();
                    this.router.navigate(['/login']);
                }, expiresInMs);
            } else {
                this.logout();
            }
        } catch {
            this.logout();
        }
    }

    logout(): void {
        localStorage.removeItem(environment.keycloack.localStorageToken);
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem(environment.keycloack.localStorageToken);
        if (!token) return false;
        return !this.isTokenExpired(token);
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = localStorage.getItem(environment.keycloack.localStorageToken) ?? '';
        }
        if (!token) return true;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const now = Math.floor(Date.now() / 1000);
            return decoded.exp < now;
        } catch {
            return true;
        }
    }

    getDecodedToken(): DecodedToken | null {
        const token = localStorage.getItem(environment.keycloack.localStorageToken);
        if (!token) return null;
        try {
            return jwtDecode<DecodedToken>(token);
        } catch {
            return null;
        }
    }

    getUserName(): string {
        return this.getDecodedToken()?.name ?? 'Usuario';
    }

    getEmail(): string {
        return this.getDecodedToken()?.email ?? '';
    }
}
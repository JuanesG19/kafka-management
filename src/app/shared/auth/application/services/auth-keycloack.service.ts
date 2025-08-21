import { Injectable, signal } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ISession } from '../../domain/ISession';
import { AuthKeycloackHttpService } from '../../infrastructure/http/auth-keycloack-http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthKeycloackService {
    constructor(private readonly authKeycloackHttpService: AuthKeycloackHttpService) { }

    private readonly tokenKeycloack = new BehaviorSubject<string | null>(null);

    getTokenState() {
        return this.tokenKeycloack.asObservable();
    }

    getKeycloakTokenService(sessionData: ISession): void {
        localStorage.removeItem(environment.keycloack.localStorageToken);

        const userData: string = sessionData.username;
        const userPassword: string = sessionData.password;


        this.authKeycloackHttpService
            .getKeycloakToken(userData, userPassword)
            .subscribe((responseToken) => {
                if (responseToken) {
                    const token = responseToken.access_token;
                    localStorage.setItem(
                        environment.keycloack.localStorageToken,
                        token
                    );

                    this.tokenKeycloack.next(token);
                } else {
                    console.error('Error al obtener el token');
                }
            });

    }

    logout(): void {
        // Quitar token del localStorage
        localStorage.removeItem(environment.keycloack.localStorageToken);

        // Limpiar el BehaviorSubject
        this.tokenKeycloack.next(null);
    }

}
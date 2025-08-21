import { Injectable, signal } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ISession } from '../../domain/ISession';
import { AuthKeycloackHttpService } from '../../infrastructure/http/auth-keycloack-http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthKeycloackService {
    constructor(private readonly authKeycloackHttpService: AuthKeycloackHttpService) { }

    getKeycloakTokenService(sessionData: ISession): Observable<string> {
        const userData: string = sessionData.username;
        const userPassword: string = sessionData.password;

        // Limpio token viejo
        localStorage.removeItem(environment.keycloack.localStorageToken);

        // Devuelvo el observable que emite el token
        return this.authKeycloackHttpService
            .getKeycloakToken(userData, userPassword)
            .pipe(
                map(responseToken => {
                    if (!responseToken || !responseToken.access_token) {
                        throw new Error('Error al obtener el token');
                    }
                    const token = responseToken.access_token;

                    localStorage.setItem(environment.keycloack.localStorageToken, token);
                    return token;
                })
            );
    }

    logout(): void {
        localStorage.removeItem(environment.keycloack.localStorageToken);
    }

}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ITokenKeycloackResponse } from '../../domain/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthKeycloackHttpService {
  private readonly http = inject(HttpClient);

  getKeycloakToken(
    user: string,
    pass: string
  ): Observable<ITokenKeycloackResponse> {
    const url = `${environment.url.keycloackDomain}/realms/famisanar/protocol/openid-connect/token`;

    const body = new HttpParams()
      .set('client_id', environment.keycloack.clientIdKeycloack)
      .set('username', user)
      .set('password', pass)
      .set('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<ITokenKeycloackResponse>(url, body.toString(), {
      headers: headers,
    });
  }
}

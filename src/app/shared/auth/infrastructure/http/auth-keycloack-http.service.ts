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
  private readonly url = `${environment.url.famiWS02}`;


  getWs02Token(
    user: string,
    pass: string
  ): Observable<{ access_token: string }> {

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + `${environment.famiWS02.basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const formattedUsername = `${environment.famiWS02.domain}/${user}`;


    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', formattedUsername)
      .set('password', pass);


    return this.http.post<ITokenKeycloackResponse>(this.url, body.toString(), {
      headers: headers,
    });
  }
}

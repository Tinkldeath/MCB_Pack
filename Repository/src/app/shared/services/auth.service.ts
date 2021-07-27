import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedIn, Registered } from '../models/models';
import { apiUrl } from 'src/assets/keys';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(
    private http : HttpClient,
  ) { }

  Login(user: any) : Observable<LoggedIn>{
    return this.http.post<LoggedIn>(`${apiUrl}/auth/login`,user);
  }

  Register(user: any) :Observable<{token: string}> {
    return this.http.post<{token: string}>(`${apiUrl}/auth/register`,user).pipe(
      tap(({token}) => {
        localStorage.setItem('authToken',token);
      })
    )
  }

}

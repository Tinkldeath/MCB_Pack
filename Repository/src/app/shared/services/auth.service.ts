import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoggedIn, Registered } from '../models/models';
import { apiUrl } from 'src/assets/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
  ) { }

  Login(user: User) : Observable<LoggedIn>{
    return this.http.post<LoggedIn>(`${apiUrl}/auth/login`,user);
  }

  Register(user: User) :Observable<Registered> {
    return this.http.post<Registered>(`${apiUrl}/auth/register`,user);
  }

}

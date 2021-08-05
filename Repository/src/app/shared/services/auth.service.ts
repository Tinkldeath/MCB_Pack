import { IUser } from './../models/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/assets/keys';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
  ) { }

  Login(user: any) : Observable<{token: string, user: IUser}>{
    return this.http.post<{token: string, user: IUser}>(`${apiUrl}/auth/login`,user);
  }

  Register(user: any) :Observable<{message: string}> {
    return this.http.post<{message: string}>(`${apiUrl}/auth/register`,user);
  }

  ChangePassword(user: any) : Observable<{login: string, token:string}>{
    return this.http.post<{login: string, token: string}>(`${apiUrl}/auth/changePassword`,user);
  }

}

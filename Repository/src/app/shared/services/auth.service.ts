import { IUser } from './../models/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/assets/keys';

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
    return this.http.patch<{message: string}>(`${apiUrl}/auth/register`,user);
  }

  ChangePassword(user: any) : Observable<{message: string}>{
    return this.http.patch<{message: string}>(`${apiUrl}/auth/changePassword`,user);
  }

  ChangeLogin(user: any) : Observable<{message: string}>{
    return this.http.patch<{message: string}>(`${apiUrl}/auth/changeLogin`,user);
  }

  /*
    Давай по порядку, начнём с Observable, Observable это тип данных, изменеие которого мы будем
    отслеживать и сразу же обрабатывать. В нашем случае изменение Observable у методов для запросов
    означает ответ от сервера, а тип, к которому мы его приводим через этот оператор <type> это те данные,
    которые отправляет сервер в ответ, так что они должны соответствовать тому, что он отправляет 1 в 1.
    При смене пароля нам не нужно отправлять токен, а только ответить что пароль изменён или же нет, значит
    мы ожидаем некий объект с полем message, поэтому к такому типу мы наш Observable и приводим.
    Дальше иди в change-password.component.ts
  */
}

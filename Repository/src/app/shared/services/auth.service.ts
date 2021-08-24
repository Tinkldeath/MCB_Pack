import { ViewService } from './view.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { IUser } from './../models/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrl } from 'src/assets/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private dataService: DataService,
    private router: Router,
    private viewService: ViewService
  ) { }

  private GetToken(){
    const user: IUser = this.dataService.DecryptUser();
    if(user === null || user === undefined){
      return null;
    }
    else{
      return user.token;
    }
  }

  private HandleError(error: HttpErrorResponse){
    if(error.status === 401){
      alert('Необходимо заново войти в систему');
      this.dataService.SetUser(null);
      this.dataService.SetUserSession(null);
      this.dataService.Clear();
      this.viewService.ChangeMessage(null);
      this.router.navigateByUrl('sign-in');
    }
    else if(error.status === 404){
      console.log('Bad request');
    }
  }

  Login(user: any) : Observable<{token: string, user: IUser}>{
    return this.http.post<{token: string, user: IUser}>(`${apiUrl}/auth/login`,user);
  }

  Register(user: any) :Observable<{message: string}> {
    return this.http.post<{message: string}>(`${apiUrl}/auth/register`,user);
  }

  ChangePassword(user: any) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/auth/changePassword`,user,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      })
    );
  }

  ChangeLogin(user: any) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/auth/changeLogin`,user,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      })
    );
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

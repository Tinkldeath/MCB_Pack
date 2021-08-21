import { Subscription } from 'rxjs';
import { ViewService } from '../../shared/services/view.service';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {

  aSub: Subscription = null;
  stay: boolean = false;
  login: string = '';
  password: string = '';

  constructor(
    private auth : AuthService,
    private viewService: ViewService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  SignIn(){
    if(this.login != '' && this.password != ''){
      const user = {
        login: this.login,
        password: this.password
      };
      this.aSub = this.auth.Login(user).subscribe((data) => {
        if(data.token === ''){
          alert('Неверный логин или пароль, повторите попытку');
        }
        else if(data.token === 'not found'){
          alert('Пользователь с таким логином не найден, зарегистрируйтесь');
        }
        else{
          alert('Успешный вход');
          if(data.user.favorites === null){
            data.user.favorites = [];
          }
          const User = {
            token: data.token,
            _id: data.user._id,
            login: data.user.login,
            password: data.user.password,
            isAdmin: data.user.isAdmin,
            isModer: data.user.isModer,
            favorites: data.user.favorites
          }
          if(this.stay){
            this.dataService.SetUser(User);
          }
          else{
            this.dataService.SetUserSession(User);
          }
          this.viewService.ChangeUser(User);
          this.router.navigateByUrl('home');
        }
      }, (err) => {
        if(err){
          alert('Произошла ошибка при логине');
          console.log(err);
        }
      });
    }
    else{
      alert('Заполните все поля ввода!');
    }
  }

  ChangeStay(){
    this.stay = !this.stay;
  }

  ngOnDestroy(){
    if(this.aSub !== null){
      this.aSub.unsubscribe();
    }
  }
}

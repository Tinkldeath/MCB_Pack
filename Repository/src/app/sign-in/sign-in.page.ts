import { User } from './../shared/models/models';
import { AuthService } from './../shared/services/auth.service';
import { ViewService } from '../shared/services/view.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  stay: boolean = false;
  login: string = '';
  password: string = '';

  constructor(
    private auth : AuthService,
    private router: Router,
    private viewService: ViewService
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  SignIn(){
    if(this.login != '' && this.password != ''){
      const user = {
        login: this.login,
        password: this.password
      };
      this.auth.Login(user).subscribe((data) => {
        if(data.token === ''){
          alert('Неверный логин или пароль, повторите попытку');
        }
        else if(data.token === 'not found'){
          alert('Пользователь с таким логином не найден, зарегистрируйтесь');
        }
        else{
          alert('Успешный вход');
          const inUser = data.user;
          const user = new User(inUser._id,data.token,inUser.login,inUser.password,inUser.isAdmin,inUser.isModer,this.stay);
          this.viewService.ChangeMessage(user);
          localStorage.setItem('user',JSON.stringify(user));
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
}

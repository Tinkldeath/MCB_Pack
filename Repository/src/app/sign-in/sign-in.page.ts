import { DataService } from './../shared/services/data.service';
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
    private viewService: ViewService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.DeleteUser();
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
          const user = data.user;
          user.stays = this.stay.toString();
          this.dataService.SaveUser(user);
          this.viewService.ChangeMessage(this.login);
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

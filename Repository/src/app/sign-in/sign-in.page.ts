import { DataService } from './../shared/services/data.service';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User, UserData } from './../shared/models/models';
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
  object: UserData;

  constructor(
    private auth : AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.object = message);
  }

  SignIn(){
    if(this.login != '' && this.password != ''){
      const user = new User(this.login, this.password, false);
      this.auth.Login(user).subscribe((data) => {
        if(data.token === ''){
          alert('Неверный логин или пароль, повторите попытку');
        }
        else if(data.token === 'not found'){
          alert('Пользователь с таким логином не найден, зарегистрируйтесь');
        }
        else{
          alert('Успешный вход');
          if(this.stay){
            localStorage.setItem('token',data.token);
            localStorage.setItem('login',data.login);
            localStorage.setItem('isAdmin',data.isAdmin.toString());
            localStorage.setItem('stay',this.stay.toString());
            localStorage.setItem('id',data.id);
          }
          this.object = new UserData(data.login,this.stay.toString(),data.isAdmin.toString(),data.token,data.id);
          this.dataService.ChangeMessage(this.object);
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

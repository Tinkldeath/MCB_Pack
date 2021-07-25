import { Router } from '@angular/router';
import { User, Registered } from './../shared/models/models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  login: string = '';
  password: string = '';
  repeat: string = '';
  registered: Registered;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Register(){
    if(this.login === '' || this.password == '' || this.password != this.repeat){
      alert('Заполните все поля корректно!');
      return;
    }
    else{
      const user = new User(this.login,this.password,false);
      this.authService.Register(user).subscribe(data => {
        if(data.message == 'Created'){
          alert('Вы зарегистрированы и можете войти со своими данными');
          this.router.navigateByUrl('sign-in');
        }
        else if(data.message == 'Conflict'){
          alert('Пользователь с таким логином уже зарегистрирован');
          return;
        }
        else{
          alert('Ошибка сервера, попробуйте позже');
          return;
        }
      }, (err) => {
        if(err){
          console.log(err);
          alert('Ошибка сервера, попробуйте позже');
          return;
        }
      });
    }
  }

}

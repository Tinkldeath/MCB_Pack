import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  aSub: Subscription;
  login: string = '';
  password: string = '';
  repeat: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.aSub !== null){
      this.aSub.unsubscribe();
    }
  }

  Register(){
    if(this.login === '' || this.password == '' || this.password != this.repeat){
      alert('Заполните все поля корректно!');
      return;
    }
    else{
      const user = {
        login: this.login,
        password: this.password,
        isAdmin: false,
        isModer: false
      };
      this.aSub = this.authService.Register(user).subscribe(data => {
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

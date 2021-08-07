import { DataService } from './../../shared/services/data.service';
import { IUser } from './../../shared/models/models';
import { ViewService } from './../../shared/services/view.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

// Про эти импорты тоже нельзя забывать

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  vSub: Subscription = null;
  /*
    Эти переменные нужны для работы атрибута [(ngModel)] который написан возле инпутов в html.
    ngModel работает следующим образом: любые изменения в инпутах будут изменять переменные ниже,
    из них мы будем брать данные для запросов. Приватный юзер нужен чтобы выцепить логин.
  */
  oldPassword: string = null;
  newPassword: string = null;
  repeatNewPassword: string = null;

  private user: IUser = null;

  constructor(
    // Не забываем импортировать всё нужное через конструктор
    private dataService: DataService,
    private authService: AuthService,
    private viewService: ViewService,
    private router: Router
    ) { }

  ngOnInit() {
    // При инициализации компонента сразу забираем из сервиса данные о пользователе,
    // из них будем доставать логин
    this.vSub = this.viewService.currentUser.subscribe((data) => {
      this.user = data;
    });
  }

  ngOnDestroy(){
    // Не забываем чистить память
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
  }

  Change(){
    if(this.oldPassword === null || this.newPassword === null || this.repeatNewPassword === null ||
       this.oldPassword === '' || this.newPassword === '' || this.repeatNewPassword === ''){
      alert("Заполните все поля корректно!");
      return;
    }
    else if(this.newPassword === this.oldPassword){
      alert("Нельзя использовать одинаковый пароль.");
      return;
    }
    else if(this.newPassword !== this.repeatNewPassword){
      alert("Новые пароли не совпадают.");
      return;
    }
    else{
      const user = {
        login: this.user.login,
        password: this.oldPassword
      }
      // Через сервис авторизации проверяем, правильно ли введён старый пароль
      this.authService.Login(user).subscribe((data) => {
        if(data.token !== null){
          const newUser = {
            login: this.user.login,
            password: this.newPassword
          }
          this.authService.ChangePassword(newUser).subscribe((data) => {
            /*
              Как я и говорил, мы ожидаем объект с полем message, и уже в зависимости от
              сообщения будем действовать дальше.
            */
            if(data.message === 'Password updated'){
              /*
                Если всё ок, тогда мы уведомляем об этом и ВНИМАНИЕ, удаляем ВСЮ информацию о
                предыдущих данных пользователя из всех возможных мест, то есть из
                sessionStorage, localStorage, dataService и viewService,
                а потом перенаправляем на главную страницу чтобы юзер вошёл повторно.
                В остальных компонентах принцип тот же, это было сложнее всего, ибо тут надо
                всё убрать за собой и только после этого перенаправить на home page
              */
              alert('Пароль успешно изменён, вы можете войти с новыми данными');
              localStorage.clear();
              sessionStorage.clear();
              this.dataService.Clear();
              this.viewService.ChangeUser(null);
              this.router.navigateByUrl('home');
            }
            else{
              alert('Ошибка на стороне сервера, попробуйте позже');
            }
          });
        }
        else{
          alert('Вы ввели неверный старый пароль');
        }
      });
    }
  }
}

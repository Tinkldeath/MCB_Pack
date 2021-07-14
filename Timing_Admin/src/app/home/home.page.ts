import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pass: string;
  log: string;
  authorized: boolean = false;

  constructor() {}

  checkAuth(log,pass){
    if(log === undefined || pass === undefined){
      alert('Заполните все поля');
    }
    else if(log === 'admin' && pass === 'root'){
      document.location.href = "/specials";
    }
    else{
      alert('Неверный логин или пароль');
      this.authorized = false;
    }
  }
}

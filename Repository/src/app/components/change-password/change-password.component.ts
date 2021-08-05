import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { AsyncLocalStorage } from 'async_hooks';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  pSub: Subscription = null;
  // login:
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {}

  Change(){
    if(this.oldPassword === '' || this.newPassword === '' || this.repeatNewPassword === ''){
      alert("Заполните все поля корректно!");
      return;
    }
    else if(this.newPassword === this.oldPassword){
      alert("Нельзя использовать старый пароль.");
      return;
    }
    else if(this.newPassword !== this.repeatNewPassword){
      alert("Пароли не совпадают.");
      return;
    }
    else{

    }

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.scss'],
})
export class ChangeLoginComponent implements OnInit {

  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  constructor(
    private dataService: DataService,
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

  }

}

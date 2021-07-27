import { ViewService } from './../shared/services/view.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './../shared/models/models';
import { User } from './../shared/models/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User = null;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private viewService: ViewService,
  ) {
    this.viewService.currentMessage.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  Logout(){
    this.viewService.ChangeMessage(null);
    localStorage.clear();
    this.router.navigateByUrl('home');
  }

}

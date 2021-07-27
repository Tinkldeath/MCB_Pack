import { DataService } from './../shared/services/data.service';
import { ViewService } from './../shared/services/view.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './../shared/models/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  login: string = null;
  isAdmin: string = null;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private viewService: ViewService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.login = this.dataService.GetLogin();
    this.isAdmin = this.dataService.GetAdmin();
  }

  Logout(){
    this.dataService.DeleteUser();
    this.viewService.ChangeMessage(this.dataService.GetLogin());
    this.router.navigateByUrl('home');
  }

}

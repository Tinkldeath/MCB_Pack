import { DataService } from './../shared/services/data.service';
import { RequestsService } from '../shared/services/requests.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, UserData } from '../shared/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  categories: Category[] = [];

  userdata: UserData = null;

  constructor(
    private dataService: DataService,
    private reqService: RequestsService,
    private router: Router
    ) {
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
  }

  ngOnInit(){
    this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const isAdmin = localStorage.getItem('isAdmin');
    const stay = localStorage.getItem('stay');
    const id = localStorage.getItem('id');
    this.userdata = new UserData(login,stay,isAdmin,token,id);
  }

  Logout(){
    localStorage.clear();
    this.userdata.login = null;
    this.userdata.id = null;
    this.userdata.isAdmin = null;
    this.userdata.stay = null;
    this.userdata.token = null;
  }

  ngOnDestroy(){
    if(this.userdata.stay !== "true"){
      localStorage.clear();
      this.userdata.login = null;
      this.userdata.id = null;
      this.userdata.isAdmin = null;
      this.userdata.stay = null;
      this.userdata.token = null;
    }
  }

  GoFavorite(){
    this.dataService.ChangeMessage(this.userdata);
    this.router.navigateByUrl('favorite');
  }

  GoAdd(){
    this.dataService.ChangeMessage(this.userdata);
    this.dataService.ChangeCategory(this.categories);
    this.router.navigateByUrl('add-item');
  }

  GoProfile(){
    this.dataService.ChangeMessage(this.userdata);
    this.router.navigateByUrl('account');
  }
}

import { DataService } from './../shared/services/data.service';
import { RequestsService } from '../shared/services/requests.service';
import { ViewService } from '../shared/services/view.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  searchCategories: boolean = true;
  login: string = null;
  stays: string = null;
  categories: Category[] = [];

  constructor(
    private reqService: RequestsService,
    private viewService: ViewService,
    private dataService: DataService,
    private router: Router
    ) {
      this.viewService.currentMessage.subscribe(login => {
        this.login = login;
      });
  }

  ngOnInit(){
    this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.stays = this.dataService.GetStays();
    this.login = this.dataService.GetLogin();
    console.log(this.stays);
    console.log(this.login);
  }

  ngOnDestroy(){
    if(this.dataService.GetStays() === 'false'){
      localStorage.clear();
      this.viewService.ChangeMessage(null);
    }
  }

  GoFavorite(){
    this.router.navigateByUrl('favorite');
  }

  GoAdd(){
    this.viewService.ChangeCategory(this.categories);
    this.router.navigateByUrl('add-item');
  }

  GoProfile(){
    this.router.navigateByUrl('account');
  }

  SwitchSearch(){
    this.searchCategories = !this.searchCategories;
  }
}

import { User } from './../shared/models/models';
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
  categories: Category[] = [];
  user: User = null;

  constructor(
    private reqService: RequestsService,
    private viewService: ViewService,
    private router: Router
    ) {
      this.viewService.currentMessage.subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit(){
    this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnDestroy(){
    if(this.user.GetStays() === false){
      localStorage.clear();
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

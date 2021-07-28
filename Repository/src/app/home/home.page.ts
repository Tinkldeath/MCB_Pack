import { Subscription } from 'rxjs';
import { IUser } from './../shared/models/models';
import { RequestsService } from '../shared/services/requests.service';
import { ViewService } from '../shared/services/view.service';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  user: IUser = null;
  searchCategories: boolean = true;
  categories: Category[] = [];
  vSub: Subscription = null;

  constructor(
    private reqService: RequestsService,
    private viewService: ViewService,
    private dataService: DataService,
    private router: Router
    ) {
      this.user = this.dataService.DecryptUser();
      this.vSub = this.viewService.currentUser.subscribe(user => {
        this.user = user;
      });
    }

  ngOnInit(){
    this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.user = this.dataService.DecryptUser();
    this.viewService.ChangeUser(this.user);
    if(this.user === null){
      localStorage.clear();
    }
  }

  ngOnDestroy(){
    if(this.vSub !== null){
      this.vSub.unsubscribe();
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

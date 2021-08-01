import { Subscription } from 'rxjs';
import { IUser, ISubject } from './../shared/models/models';
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
  selectedCategory: string = null;
  selectedSubject: string = null;


  categories: Category[] = [];
  subjects: ISubject[] = [];


  vSub: Subscription = null;
  cSub: Subscription = null;
  sSub: Subscription = null;

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
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.sSub = this.reqService.GetSubjects().subscribe((data) => {
      this.subjects = data;
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
    if(this.sSub !== null){
      this.sSub.unsubscribe();
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

  Reset(){
    this.selectedCategory = null;
    this.selectedSubject = null;
  }
}

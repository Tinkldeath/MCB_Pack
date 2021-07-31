import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewService } from './../shared/services/view.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, IUser } from './../shared/models/models';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  selection: string = '';
  categories: Category[] = [];
  user: IUser = null;
  vSub: Subscription = null;
  uSub: Subscription = null;

  constructor(
    private viewService: ViewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vSub = this.vSub = this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    })
    this.uSub = this.viewService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(){
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
    if(this.uSub !== null){
      this.uSub.unsubscribe();
    }
  }

  Logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.viewService.ChangeUser(null);
    this.router.navigateByUrl('home');
  }

  Change(message: string){
    this.selection = message;
  }
}

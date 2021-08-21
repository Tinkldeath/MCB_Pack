import { DataService } from './../../shared/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewService } from '../../shared/services/view.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory, IUser, IPost } from '../../shared/models/models';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  selection: string = '';
  user: IUser = null;
  vSub: Subscription = null;
  uSub: Subscription = null;
  pSub: Subscription = null;

  constructor(
    private viewService: ViewService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
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
    localStorage.clear();
    sessionStorage.clear();
    this.viewService.ChangeUser(null);
    this.dataService.SetUser(null);
    this.dataService.Clear();
    this.router.navigateByUrl('home');
  }

  Change(message: string){
    this.selection = message;
  }

  Reset(){
    this.selection = '';
  }
}

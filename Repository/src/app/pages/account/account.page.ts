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
export class AccountPage implements OnInit {

  selection: string = '';
  user: IUser = null;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.user = this.dataService.DecryptUser();
  }

  Logout(){
    localStorage.clear();
    localStorage.clear();
    sessionStorage.clear();
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { UserData } from '../shared/models/models';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  userdata: UserData = null;

  constructor(
    private router : Router,
    private dataService : DataService
  ) {
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
  }

  Logout(){
    localStorage.clear();
    this.userdata.login = null;
    this.userdata.id = null;
    this.userdata.isAdmin = null;
    this.userdata.stay = null;
    this.userdata.token = null;
    this.router.navigateByUrl('home');
  }

}

import { Subscription } from 'rxjs';
import { IUser } from './../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewService } from '../shared/services/view.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit, OnDestroy {

  user: IUser = null;
  vSub: Subscription = null;

  constructor(
    private viewService: ViewService
  ) {}

  ngOnInit() {
    this.vSub = this.viewService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
  }

}

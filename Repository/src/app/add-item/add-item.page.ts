import { Subscription } from 'rxjs';
import { ViewService } from '../shared/services/view.service';
import { ICategory, IUser } from './../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  user: IUser = null;
  vSub: Subscription = null;
  uSub: Subscription = null;

  constructor(
    private viewService: ViewService
  ) {}

  ngOnInit() {
    this.vSub = this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    });
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
}

import { Subscription } from 'rxjs';
import { ViewService } from '../shared/services/view.service';
import { ICategory, ISubject, IUser } from './../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from '../shared/services/requests.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  subjects: ISubject[] = [];
  user: IUser = null;
  vSub: Subscription = null;
  uSub: Subscription = null;
  sSub: Subscription = null;

  constructor(
    private viewService: ViewService,
    private reqServise: RequestsService
  ) {}

  ngOnInit() {
    this.vSub = this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    });
    this.sSub = this.reqServise.GetSubjects().subscribe(data => {
      this.subjects = data;
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
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
  }
}

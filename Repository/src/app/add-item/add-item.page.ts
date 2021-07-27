import { ViewService } from '../shared/services/view.service';
import { Category, User } from './../shared/models/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  categories: Category[] = [];
  user: User = null;

  constructor(
    private viewService: ViewService
  ) {
    this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    });
    this.viewService.currentMessage.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {}
}

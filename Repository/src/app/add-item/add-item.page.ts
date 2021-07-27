import { DataService } from './../shared/services/data.service';
import { ViewService } from '../shared/services/view.service';
import { Category } from './../shared/models/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  categories: Category[] = [];
  login: string = null;

  constructor(
    private dataService: DataService,
    private viewService: ViewService
  ) {
    this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit() {
    this.login = this.dataService.GetLogin();
  }
}

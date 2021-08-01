import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Category } from 'src/app/shared/models/models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  cSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

}

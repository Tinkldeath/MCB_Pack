import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { ICategory } from 'src/app/shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  categories: ICategory[] = [];
  cSub: Subscription = null;
  selection: string = '';

  constructor(
    private reqService: RequestsService,
    private viewServise: ViewService
  ) { }

  ngOnInit() {
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

}

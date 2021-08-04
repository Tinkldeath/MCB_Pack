import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { ICategory } from 'src/app/shared/models/models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  cSub: Subscription = null;
  selection: string = '';

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnDestroy(){
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
  }

  Change(message: string){
    this.selection = message;
  }
}

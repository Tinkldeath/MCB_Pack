import { ICategory } from './../../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
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

  DeleteCategory(category: ICategory){
    this.reqService.DeleteCategory(category).subscribe((data) => {
      if(data.message === 'Deleted'){
        alert('Категория удалена');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }
}

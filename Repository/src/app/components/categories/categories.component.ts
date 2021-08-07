import { ICategory } from './../../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';


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
    private reqService: RequestsService,
    private viewServise: ViewService
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

  ChangeCategory(category: ICategory){
    this.reqService.ChangeCategory(category).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Категория изменена');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

  SelectCategory(category: ICategory){
    this.selection = 'true';   
  }

  Change(message: string){
    this.selection = message;
  }
}

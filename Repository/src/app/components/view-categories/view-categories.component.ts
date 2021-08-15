import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { ICategory, IPost, ISubject, IUser } from 'src/app/shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit, OnDestroy {

  selectedCategory: string = null; // Отслеживаем изменение в селекте через эту переменную, подробнее в html
  category: ICategory = null; // Отслеживаем выбор категории, если мы выбрали её на HomePage
  categories: ICategory[] = []; // Храним все категории для отображения

  cSub: Subscription = null;
  vSub: Subscription = null;

  constructor(
    private viewService: ViewService,
  ) {
  }

  ngOnInit() {
    this.cSub = this.viewService.allCategories.subscribe((data) => {
      /*
        Забираем уже опять же из allCategories, т.к. категории все нужно отображать всегда.
      */
      this.categories = data;
    });
    this.vSub = this.viewService.selectedCategory.subscribe((data) => {
      /*
        Здесь просто проверяем, был ли клик на категорию в HomePage, если да, то мы меняем модель
        для отображения, чтобы наш выбор был виден и на компоненте
      */
      this.category = data;
      if(this.category !== null){
        this.selectedCategory = this.category.name;
      }
      else{
        this.selectedCategory = null;
      }
    });
  }

  ngOnDestroy(){
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
  }

  SelectCategory(){
    for(let category of this.categories){
      if(category.name === this.selectedCategory){
        /*
          Всё что нужно сделать - тупо передать в сервис категорию которую мы выбрали,
          ну и найти её конечно же в массиве, потому что в селекте мы отображаем только названия,
          то есть и модель у нас типа String, а не типа ICategory, потому мы ищем категорию по имени
          в массиве. Так работают все компоненты, потому что мейн уже отслеживает изменения всех фильтров
          из других компонентов, нам нужно просто изменить переменную в сервисе, в целом идея вот такая,
          ещё оставлю пару комментов в home.page.ts
        */
        this.viewService.ChangeViewCategory(category);
        break;
      }
    }
  }

}

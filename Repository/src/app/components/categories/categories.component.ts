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
  categoryToEdit: ICategory = null;
  cSub: Subscription = null;
  rSub: Subscription = null;

  newName: string = null;
  newDescription: string = null;

  constructor(
    private reqService: RequestsService,
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
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
  }

  EditCategory(category: ICategory){
    this.categoryToEdit = category;
    if(this.categoryToEdit !== null){
      this.newName = this.categoryToEdit.name;
      this.newDescription = this.categoryToEdit.description;
    }
  }

  DeleteCategory(category: ICategory){
    this.rSub = this.reqService.DeleteCategory(category).subscribe(data => {
      if(data.message === 'Deleted'){
        alert('Категория удалена');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

  ChangeCategory(){
    if(this.newName === '' || this.newDescription === ''){
      alert('Заполните все поля корректно!');
      return;
    }
    else if(this.categoryToEdit.name === this.newName && this.categoryToEdit.description === this.newDescription){
      alert('Вы ничего не изменили!');
      return;
    }
    const category ={
      _id: this.categoryToEdit._id,
      name: this.newName,
      description: this.newDescription
    }
    this.reqService.ChangeCategory(category).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Категория изменена');
        this.categoryToEdit = null;
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }
}

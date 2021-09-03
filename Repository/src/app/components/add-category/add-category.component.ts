import { Subscription } from 'rxjs';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  name: string = null;
  description: string = null;
  rSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {}

  ngOnDestroy(){
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
  }

  AddCategory(){
    if(this.name !== null && this.description !== null){
      const newCategory = {
        name: this.name,
        description: this.description
      };
      try {
        this.rSub = this.reqService.AddCategory(newCategory).subscribe(data => {
          if(data.message === 'Created'){
            alert('Категория создана');
            this.ngOnDestroy();
            this.ngOnInit();
            return;
          }
          else if(data.message === 'Conflict'){
            alert('Такая категория уже существует');
            return;
          }
          else{
            alert('Ошибка на стороне сервера, попробуйте позже');
            return;
          }
        }, (err) => {
          console.log(err);
          return;
        });
      } catch (err) {
        console.log(err);
        return;
      }
    }
    else{
      alert('Заполните все поля!');
    }
  }

}

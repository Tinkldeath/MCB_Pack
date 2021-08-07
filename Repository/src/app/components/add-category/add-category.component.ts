import { RequestsService } from 'src/app/shared/services/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {

  name: string = null;
  description: string = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {}

  AddCategory(){
    if(this.name !== null && this.description !== null){
      const newCategory = {
        name: this.name,
        description: this.description
      };
      this.reqService.AddCategory(newCategory).subscribe((data) => {
        if(data.message === 'Created'){
          alert('Категория создана');
        }
        else if(data.message === 'Conflict'){
          alert('Такая категория уже существует');
        }
        else{
          alert('Ошибка на стороне сервера, попробуйте позже');
        }
      });
    }
    else{
      alert('Заполните все поля!');
    }
  }

}

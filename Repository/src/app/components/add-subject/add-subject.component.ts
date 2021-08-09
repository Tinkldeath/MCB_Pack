import { ICategory } from './../../shared/models/models';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {

  name: string = null;
  categories: ICategory[] = [];
  selectedCategory: string = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  AddSubject(){
    if(this.name === null || this.selectedCategory === null){
      alert('Заполните все поля!');
    }
    const newSubject = {
      categoryName: this.selectedCategory,
      name: this.name
    };
    this.reqService.AddSubject(newSubject).subscribe(data => {
      if(data.message === 'Created'){
        alert('Предмет добавлен');
      }
      else if(data.message === 'Conflict'){
        alert('Такой предмет уже существует');
      }
      else{
        alert('Ошибка на стороне сервера, попробуйте позже');
      }
    });
  }

}

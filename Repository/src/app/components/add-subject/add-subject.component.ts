import { Subscription } from 'rxjs';
import { ICategory } from './../../shared/models/models';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit, OnDestroy {

  name: string = null;
  categories: ICategory[] = [];
  selectedCategory: string = null;
  rSub: Subscription = null;
  cSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnDestroy(){
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
  }

  AddSubject(){
    if(this.name === null || this.selectedCategory === null){
      alert('Заполните все поля!');
    }
    const newSubject = {
      categoryName: this.selectedCategory,
      name: this.name
    };
    try {
      this.rSub = this.reqService.AddSubject(newSubject).subscribe(data => {
        if(data.message === 'Created'){
          alert('Предмет добавлен');
          this.ngOnDestroy();
          this.ngOnInit();
          return;
        }
        else if(data.message === 'Conflict'){
          alert('Такой предмет уже существует');
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

}

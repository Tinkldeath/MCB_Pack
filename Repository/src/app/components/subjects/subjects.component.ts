import { ISubject, ICategory } from './../../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit, OnDestroy {

  subjects: ISubject[] = [];
  categories: ICategory[] = [];
  categoryName: string = '';
  subjectToEdit: ISubject = null;

  sSub: Subscription = null;
  cSub: Subscription = null;
  dSub: Subscription = null;
  rSub: Subscription = null;

  newName: string = '';

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.sSub = this.reqService.GetSubjects().subscribe((data) => {
      this.subjects = data;
    });
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnDestroy(){
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
    if(this.dSub !== null){
      this.dSub.unsubscribe();
    }
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
  }

  SelectSubject(subject: ISubject){
    this.subjectToEdit = subject;
    if(this.subjectToEdit !== null){
      this.newName = this.subjectToEdit.name;
      this.categoryName = this.subjectToEdit.categoryName;
    }
  }

  DeleteSubject(subject: ISubject){
    const delSubject = {
      _id: subject._id,
      categoryName: subject.categoryName,
      name: subject.name
    }
    this.dSub = this.reqService.DeleteSubject(delSubject).subscribe((data) => {
      if(data.message === 'Deleted'){
        alert('Предмет удалён');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

  ChangeSubject(){
    if(this.newName === ''){
      alert('Некорректный ввод!');
      return;
    }
    else if(this.newName === this.subjectToEdit.name && this.categoryName === this.subjectToEdit.categoryName){
      alert('Вы ничего не изменили!');
      return
    }
    const subject = {
      _id: this.subjectToEdit._id,
      categoryName: this.categoryName,
      name: this.newName
    };
    this.rSub = this.reqService.ChangeSubject(subject).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Предмет изменён');
        this.subjectToEdit = null;
        this.newName = '';
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

}

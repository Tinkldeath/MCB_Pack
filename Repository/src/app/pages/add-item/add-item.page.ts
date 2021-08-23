import { DataService } from './../../shared/services/data.service';
import { Subscription } from 'rxjs';
import { ViewService } from '../../shared/services/view.service';
import { ICategory, ISubject, IUser } from '../../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  subjects: ISubject[] = [];
  user: IUser = null;

  viewCategories: ICategory[] = [];
  viewSubjects: ISubject[] = [];

  vSub: Subscription = null;
  sSub: Subscription = null;

  name: string = '';
  theme: string = '';
  courseNumber: number = null;
  author: string = '';
  year: number = null;
  university: string = '';
  category: string = '';
  subject: string = '';
  description: string = '';
  file: File = null;

  constructor(
    private reqServise: RequestsService,
    private dataService: DataService
  ) {}

  private SetFormData(){
    let formData: FormData = new FormData();
    formData.append('file',this.file,this.file.name);
    formData.append('name',this.name);
    formData.append('theme',this.theme);
    formData.append('ownerId',this.user._id);
    formData.append('category',this.category);
    formData.append('subject',this.subject);
    formData.append('courseNumber',this.courseNumber.toString());
    formData.append('author',this.author);
    formData.append('year',this.year.toString());
    formData.append('university',this.university);
    formData.append('description',this.description);
    formData.append('status','Awaiting');
    return formData;
  }

  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
  }

  ngOnInit() {
    this.vSub = this.reqServise.GetCategories().subscribe(data => {
      this.categories = data;
      this.viewCategories = data;
    });
    this.sSub = this.reqServise.GetSubjects().subscribe(data => {
      this.subjects = data;
      this.viewSubjects = data;
    });
    this.user = this.dataService.DecryptUser();
  }

  ngOnDestroy(){
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
  }

  AddPost(){
    if(this.name === '' || this.theme === '' || this.year === null || this.courseNumber === null || this.subject === '' ||
      this.category === '' || this.description === ''){
        alert('Заполните все поля!');
        return;
    }
    else if(this.file === null){
      alert('Выберите файл!');
      return;
    }
    let formData = this.SetFormData();
    try {
      this.reqServise.AddPost(formData).subscribe((data) => {
        if(data.message === 'Created'){
          alert('Пост добавлен');
          return;
        }
        else if(data.message === 'Conflict'){
          alert('Такой пост уже есть');
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

  SelectCategory(){
    this.viewSubjects = this.subjects.filter(item => item.categoryName === this.category);
    this.subject = null;
  }

  SelectSubject(){
    for(let sub of this.subjects){
      if(sub.name === this.subject){
        this.category = sub.categoryName;
        break;
      }
    }
  }

}

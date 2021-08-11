import { Subscription } from 'rxjs';
import { ViewService } from '../shared/services/view.service';
import { ICategory, ISubject, IUser } from './../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from '../shared/services/requests.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  subjects: ISubject[] = [];
  user: IUser = null;

  vSub: Subscription = null;
  uSub: Subscription = null;
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
    private viewService: ViewService,
    private reqServise: RequestsService
  ) {}

  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
  }

  ngOnInit() {
    this.vSub = this.viewService.currentCategories.subscribe(data => {
      this.categories = data;
    });
    this.sSub = this.reqServise.GetSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.uSub = this.viewService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(){
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
    if(this.uSub !== null){
      this.uSub.unsubscribe();
    }
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
  }

  AddPost(){
    let formData: FormData = new FormData();
    formData.append('file',this.file,this.file.name);
    formData.append('name',this.name);
    formData.append('theme',this.theme);
    formData.append('category',this.category);
    formData.append('subject',this.subject);
    formData.append('courseNumber',this.courseNumber.toString());
    formData.append('author',this.author);
    formData.append('year',this.year.toString());
    formData.append('university',this.university);
    formData.append('description',this.description);
    this.reqServise.AddPost(formData).subscribe((data) => {
      if(data.message === 'Created'){
        alert('Пост добавлен');
      }
      else if(data.message === 'Conflict'){
        alert('Такой пост уже есть');
      }
      else{
        alert('Ошибка');
      }
    });
  }
}

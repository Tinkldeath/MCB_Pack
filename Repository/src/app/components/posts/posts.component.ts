import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ICategory, IPost, ISubject } from 'src/app/shared/models/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  subjects: ISubject[] = [];
  categories: ICategory[] = [];
  postToEdit: IPost = null;

  newName: string = null;
  newTheme: string = null;
  newCategory: string = null;
  newSubject: string = null;
  newYear: number = null;
  newCourseNumber: number = null;
  newAuthor: string = null;
  newUniversity: string = null;
  newDescription: string = null;
  newFile: File = null;

  sSub: Subscription = null;
  cSub: Subscription = null;
  pSub: Subscription = null;
  rSub: Subscription = null;
  dSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.pSub = this.reqService.GetPosts().subscribe((data) => {
      this.posts = data;
    });
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.sSub = this.reqService.GetSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  ngOnDestroy(){
    if(this.pSub !== null){
      this.pSub.unsubscribe();
    }
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
    if(this.dSub !== null){
      this.dSub.unsubscribe();
    }
  }

  onFileChange(fileChangeEvent){
    this.newFile = fileChangeEvent.target.files[0];
  }

  EditPost(post: IPost){
    this.postToEdit = post;
    if(this.postToEdit != null){
      this.newName = this.postToEdit.name;
      this.newTheme = this.postToEdit.theme;
      this.newCategory = this.postToEdit.category;
      this.newSubject = this.postToEdit.subject;
      this.newYear = this.postToEdit.year;
      this.newCourseNumber = this.postToEdit.courseNumber;
      this.newAuthor = this.postToEdit.author;
      this.newUniversity = this.postToEdit.university;
      this.newDescription = this.postToEdit.description;
    }
  }

  DeletePost(post: IPost){
    this.dSub = this.reqService.DeletePost(post._id).subscribe((data) => {
      if(data.message === 'Deleted'){
        alert('Пост успешно удалён');
        this.postToEdit = null;
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне сервера');
        this.postToEdit = null;
        this.ngOnInit();
      }
    });
  }

  ChangePost(){
    if(this.newName === '' || this.newCategory === '' || this.newSubject === '' || this.newYear === null ||
     this.newCourseNumber === null || this.newAuthor === '' || this.newUniversity === '' || this.newDescription === ''){
      alert('Заполните все поля корректно!');
      return;
    }
    else if(this.postToEdit.name === this.newName && this.postToEdit.theme === this.newTheme && this.postToEdit.category === this.newCategory && this.postToEdit.subject === this.newSubject
      && this.postToEdit.year === this.newYear && this.postToEdit.courseNumber === this.newCourseNumber && this.postToEdit.author === this.newAuthor
      && this.postToEdit.university === this.newUniversity && this.postToEdit.description === this.newDescription && this.newFile === null){
      alert('Вы ничего не изменили!');
      return;
    }
    let formData: FormData = new FormData();
    formData.append('_id',this.postToEdit._id);
    formData.append('ownerId',this.postToEdit.ownerId);
    if(this.newFile !== null){
      formData.append('file',this.newFile,this.newFile.name);
    }
    else{
      formData.append('file',null);
    }
    formData.append('ownerId',this.postToEdit.ownerId);
    formData.append('name',this.newName);
    formData.append('theme',this.newTheme);
    formData.append('courseNumber',this.newCourseNumber.toString());
    formData.append('category',this.newCategory);
    formData.append('subject',this.newSubject);
    formData.append('year',this.newYear.toString());
    formData.append('author',this.newAuthor);
    formData.append('university',this.newUniversity);
    formData.append('description',this.newDescription);
    this.rSub = this.reqService.ChangePost(formData).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Публикация изменена');
        this.postToEdit = null;
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }
}

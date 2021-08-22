import { ViewService } from './../../shared/services/view.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ICategory, IPost, ISubject, IUser } from 'src/app/shared/models/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  subjects: ISubject[] = [];
  viewSubjects: ISubject[] = [];
  categories: ICategory[] = [];
  postToEdit: IPost = null;
  postToView: IPost = null;

  user: IUser = null;

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
  uSub: Subscription = null;

  constructor(
    private reqService: RequestsService,
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.uSub = this.viewService.currentUser.subscribe((data) => {
      this.user = data;
      if(this.user.isAdmin === true || this.user.isModer === true){
        this.pSub = this.reqService.GetPosts().subscribe((data) => {
          this.posts = data;
        });
      }
      else{
        this.pSub = this.viewService.currentPost.subscribe((data) => {
          this.posts = data;
        });
      }
    });
    this.cSub = this.reqService.GetCategories().subscribe((data) => {
      this.categories = data;
    });
    this.sSub = this.reqService.GetSubjects().subscribe((data) => {
      this.subjects = data;
      this.viewSubjects = data;
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

  OpenFile(){
    window.open(`http://localhost:4000/${this.postToView.fileUrl}`);
  }

  SelectCategory(){
    this.viewSubjects = this.subjects.filter(item => item.categoryName === this.newCategory);
    this.newSubject = null;
  }

  SelectSubject(){
    for(let sub of this.subjects){
      if(sub.name === this.newSubject){
        this.newCategory = sub.categoryName;
        break;
      }
    }
  }

  ViewPost(post: IPost){
    this.postToView = post;
    if(this.postToView != null){
      this.newName = this.postToView.name;
      this.newTheme = this.postToView.theme;
      this.newCategory = this.postToView.category;
      this.newSubject = this.postToView.subject;
      this.newYear = this.postToView.year;
      this.newCourseNumber = this.postToView.courseNumber;
      this.newAuthor = this.postToView.author;
      this.newUniversity = this.postToView.university;
      this.newDescription = this.postToView.description;
    }
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

  AcceptPost(post: IPost){
    let formData: FormData = new FormData();
    formData.append('_id',post._id);
    formData.append('ownerId',post.ownerId);
    formData.append('file',null);
    formData.append('name',post.name);
    formData.append('theme',post.theme);
    formData.append('courseNumber',post.courseNumber.toString());
    formData.append('category',post.category);
    formData.append('subject',post.subject);
    formData.append('year',post.year.toString());
    formData.append('author',post.author);
    formData.append('university',post.university);
    formData.append('description',post.description);
    formData.append('status','Accepted');
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
    this.rSub = this.reqService.ChangePost(formData).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Публикация принята');
        this.postToEdit = null;
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
    post.status = 'Accepted';
    this.viewService.ChangePosts(this.posts);
  }

  DenyPost(post: IPost){
    let formData: FormData = new FormData();
    formData.append('_id',post._id);
    formData.append('ownerId',post.ownerId);
    formData.append('file',null);
    formData.append('name',post.name);
    formData.append('theme',post.theme);
    formData.append('courseNumber',post.courseNumber.toString());
    formData.append('category',post.category);
    formData.append('subject',post.subject);
    formData.append('year',post.year.toString());
    formData.append('author',post.author);
    formData.append('university',post.university);
    formData.append('description',post.description);
    formData.append('status','Denied');
    if(this.rSub !== null){
      this.rSub.unsubscribe();
    }
    this.rSub = this.reqService.ChangePost(formData).subscribe((data) => {
      if(data.message === 'Updated'){
        alert('Публикация отклонена');
        this.postToEdit = null;
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
    post.status = 'Denied';
  }

  ChangePost(){
    if(this.newName === '' || this.newCategory === '' || this.newSubject === '' || this.newYear === null ||
     this.newCourseNumber === null || this.newAuthor === '' || this.newUniversity === '' || this.newDescription === ''){
      alert('Заполните все поля корректно!');
      return;
    }
    else if(this.newName === null || this.newCategory === null || this.newSubject === null || this.newYear === null ||
    this.newCourseNumber === null || this.newAuthor === null || this.newUniversity === null || this.newDescription === null){
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
    if(this.user.isAdmin === true || this.user.isModer === true){
      formData.append('status','Accepted');
    }
    else{
      formData.append('status','Awaiting');
    }
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

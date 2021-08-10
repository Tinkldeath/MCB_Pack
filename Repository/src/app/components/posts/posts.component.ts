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
  sSub: Subscription = null;
  cSub: Subscription = null;
  pSub: Subscription = null;
  postToEdit: IPost = null;

  newName: string = null;
  newCategory: string = null;
  newSubject: string = null;
  newYear: number = null;
  newCourseNumber: number = null;
  newAuthor: string = null;
  newUniversity: string = null;
  newDescription: string = null;

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
      console.log(data);
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
  }

  EditPost(post: IPost){
    this.postToEdit = post;
    if(this.postToEdit != null){
      this.newName = this.postToEdit.postName;
      this.newCategory = this.postToEdit.category;
      this.newSubject = this.postToEdit.subjectName;
      this.newYear = this.postToEdit.year;
      this.newCourseNumber = this.postToEdit.courseNumber;
      this.newAuthor = this.postToEdit.author;
      this.newUniversity = this.postToEdit.university;
      this.newDescription = this.postToEdit.description;
    } 
  }

  ChangePost(){
    if(this.newName === '' || this.newCategory === '' || this.newSubject === '' || this.newYear === null ||
     this.newCourseNumber === null || this.newAuthor === '' || this.newUniversity === '' || this.newDescription === ''){
      alert('Заполните все поля корректно!');
      return;
    }
    else if(this.postToEdit.postName === this.newName && this.postToEdit.category === this.newCategory && this.postToEdit.subjectName === this.newSubject
      && this.postToEdit.year === this.newYear && this.postToEdit.courseNumber === this.newCourseNumber && this.postToEdit.author === this.newAuthor
      && this.postToEdit.university === this.newUniversity && this.postToEdit.description === this.newDescription){
      alert('Вы ничего не изменили!');
      return;
    } 
    
    const post = {
      ownerId: this.postToEdit.ownerId,
      postTheme: this.postToEdit.postTheme,
      fileUrl: this.postToEdit.fileUrl,
      _id: this.postToEdit._id,
      postName: this.newName,
      category: this.newCategory,
      subjectName: this.newSubject,
      year: this.newYear,
      courseNumber: this.newCourseNumber,
      author: this.newAuthor,
      university: this.newUniversity,
      description: this.newDescription
    }

    this.reqService.ChangePost(post).subscribe((data) => {
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

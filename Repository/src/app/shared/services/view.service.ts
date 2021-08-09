import { IUser, ISubject, IPost, ICategory } from './../models/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private messageSource = new BehaviorSubject(null);
  private categorySource = new BehaviorSubject(null);
  private subjectSource = new BehaviorSubject(null);
  private userSource = new BehaviorSubject(null);
  private postSource = new BehaviorSubject(null);
  private categoryToEditSource = new BehaviorSubject(null);

  currentMessage = this.messageSource.asObservable();
  currentCategories = this.categorySource.asObservable();
  currentUser = this.userSource.asObservable();
  currentSubject = this.subjectSource.asObservable();
  currentPost = this.postSource.asObservable();
  categoryToChange = this.categoryToEditSource.asObservable();

  constructor() { }

  ChangeMessage(message: any){
    this.messageSource.next(message)
  }

  ChangeCategory(message: ICategory[]){
    this.categorySource.next(message);
  }

  ChangeUser(message: IUser){
    this.userSource.next(message);
  }

  ChangeSubject(message: ISubject[]){
    this.subjectSource.next(message);
  }

  ChangePost(message: IPost[]){
    this.postSource.next(message);
  }

  ChangeCategoryToEdit(message: ICategory){
    this.categoryToEditSource.next(message);
  }

}

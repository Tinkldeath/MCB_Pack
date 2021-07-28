import { IUser } from './../models/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private messageSource = new BehaviorSubject(null);
  private categorySource = new BehaviorSubject(null);
  private userSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  currentCategories = this.categorySource.asObservable();
  currentUser = this.userSource.asObservable();

  constructor() { }

  ChangeMessage(message: any){
    this.messageSource.next(message)
  }

  ChangeCategory(message: Category[]){
    this.categorySource.next(message);
  }

  ChangeUser(message: IUser){
    this.userSource.next(message);
  }
}

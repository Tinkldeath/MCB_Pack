import { UserData, Category } from './../models/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(null);
  private categorySource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  currentCategories = this.categorySource.asObservable();

  constructor() { }

  ChangeMessage(message: any){
    this.messageSource.next(message)
  }

  ChangeCategory(message: Category[]){
    this.categorySource.next(message);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

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

import { IUser, ISubject, IPost, ICategory } from './../models/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  // all sources
  /*
    Тут мы объявляем Behavior для всех ваще данных, они после запроса никак не меняются
    и методы для All нигде больше вызывать низя
  */
  private allSubjectsSource = new BehaviorSubject(null);
  private allPostsSource = new BehaviorSubject(null);
  private allCategoriesSource = new BehaviorSubject(null);

  // data sources
  /*
    Тут лежат ходовые данные, которые будут гулять по всем компонентам и страницам,
    отслеживать нужно будет всё, т.к. пользователю для редактирования будем давать только
    его посты.
  */
  private messageSource = new BehaviorSubject(null);
  private categorySource = new BehaviorSubject(null);
  private subjectSource = new BehaviorSubject(null);
  private userSource = new BehaviorSubject(null);
  private postSource = new BehaviorSubject(null);
  private categoryToEditSource = new BehaviorSubject(null);

  // view sources
  /*
    Здесь у нас данные для выбора в селектах или среди категорий на хоме, они нужны для фильтрации постов
    в зависимости от выбора, а также для отображения на компонентах с теми же функциями (изменением параметров поиска)
  */
  private viewAuthorSource = new BehaviorSubject(null);
  private viewCategorySource = new BehaviorSubject(null);
  private viewSubjectSource = new BehaviorSubject(null);

  // all observables
  /*
    Здесь и ниже просто делаем наши соурсы доступными для подписок
  */
  allPosts = this.allPostsSource.asObservable();
  allSubjects = this.allSubjectsSource.asObservable();
  allCategories = this.allCategoriesSource.asObservable();

  // data observables
  currentMessage = this.messageSource.asObservable();
  currentCategories = this.categorySource.asObservable();
  currentUser = this.userSource.asObservable();
  currentSubject = this.subjectSource.asObservable();
  currentPost = this.postSource.asObservable();
  categoryToChange = this.categoryToEditSource.asObservable();

  // view observables
  selectedAuthor = this.viewAuthorSource.asObservable();
  selectedCategory = this.viewCategorySource.asObservable();
  selectedSubject = this.viewSubjectSource.asObservable();

  constructor() { }

  //===================================================================================== All methods
  /*
    Здесь методы которые вызывать забаронена!!!!
  */
  SetAllPosts(message: IPost[]){
    this.allPostsSource.next(message);
  }

  SetAllCategories(message: ICategory[]){
    this.allCategoriesSource.next(message);
  }

  SetAllSubjects(message: ISubject[]){
    this.allSubjectsSource.next(message);
  }
  //=====================================================================================


  //===================================================================================== Data methods
  /*
    Здесь методы данных для отображения
  */
  ChangeMessage(message: any){
    this.messageSource.next(message)
  }

  ChangeCategories(message: ICategory[]){
    this.categorySource.next(message);
  }

  ChangeUser(message: IUser){
    this.userSource.next(message);
  }

  ChangeSubjects(message: ISubject[]){
    this.subjectSource.next(message);
  }

  ChangePosts(message: IPost[]){
    this.postSource.next(message);
  }

  ChangeCategoryToEdit(message: ICategory){
    this.categoryToEditSource.next(message);
  }
  //=====================================================================================


  //===================================================================================== View methods
  /*
    Здесь методы данных для выбора в селектах, вызываются когда юзер выбирает фильтр для постов.
    Далее иди в main.component.ts
  */
  ChangeViewAuthor(message: string){
    this.viewAuthorSource.next(message);
  }

  ChangeViewCategory(message: ICategory){
    this.viewCategorySource.next(message);
  }

  ChangeViewSubject(message: ISubject){
    this.viewSubjectSource.next(message);
  }
  //=====================================================================================

}

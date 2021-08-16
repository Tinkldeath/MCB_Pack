import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { IPost, ICategory, ISubject } from 'src/app/shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  allPosts: IPost[] = []; // Храним все посты
  viewPosts: IPost[] = []; // Храним посты которые отображаем
  category: ICategory = null; // Сохраняем выбор из других компонентов если он есть
  subject: ISubject = null; // Сохраняем выбор из других компонентов если он есть
  author: string = null;
  searchTerm: string = null;

  // Подписки для очистки памяти
  pSub: Subscription = null;
  cSub: Subscription = null;
  sSub: Subscription = null;
  aSub: Subscription = null;
  vSub: Subscription = null;
  searchSub: Subscription = null;

  constructor(
    private viewServise: ViewService
  ) { }

  ngOnInit() {
    /*
      А вот сейчас будет весело, как я и говорил, есть переменная allPosts и viewPosts.
      К allPosts мы обращаемся только чтобы забирать данные, но никак не фильтровать.
    */
    this.pSub = this.viewServise.allPosts.subscribe((data) => {
      this.allPosts = data;
    });
    this.vSub = this.viewServise.currentPost.subscribe((data) => {
      this.viewPosts = data;
    });
    this.sSub = this.viewServise.selectedSubject.subscribe((data) => {
      this.subject = data;
      this.CheckFilter();
    });
    this.cSub = this.viewServise.selectedCategory.subscribe((data) => {
      this.category = data;
      this.CheckFilter();
    });
    this.aSub = this.viewServise.selectedAuthor.subscribe((data) => {
      this.author = data;
      this.CheckFilter();
    });
    this.searchSub = this.viewServise.searchTermChange.subscribe((data) => {
      this.searchTerm = data;
    });
  }

  ngOnDestroy(){
    if(this.aSub !== null){
      this.aSub.unsubscribe();
    }
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
    if(this.searchSub !== null){
      this.searchSub.unsubscribe();
    }
    if(this.pSub !== null){
      this.pSub.unsubscribe();
    }
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
  }

  private CheckFilter(){
    this.viewPosts = this.allPosts;
    if(this.category !== null){
      let newArr = [];
      this.viewPosts.forEach(post => {
        if(post.category === this.category.name){
          newArr.push(post);
        }
      });
      this.viewServise.ChangePosts(newArr);
    }
    if(this.subject !== null){
      let newArr = [];
      this.viewPosts.forEach(post => {
        if(post.subject === this.subject.name){
          newArr.push(post);
        }
      });
      this.viewServise.ChangePosts(newArr);
    }
    if(this.author !== null){
      let newArr = [];
      this.viewPosts.forEach(post => {
        if(post.author === this.author){
          newArr.push(post);
        }
      });
      this.viewServise.ChangePosts(newArr);
    }
  }
}

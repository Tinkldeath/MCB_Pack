import { RequestsService } from './../../shared/services/requests.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { IPost, ICategory, ISubject, IUser } from 'src/app/shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  allPosts: IPost[] = []; // Храним все посты
  viewPosts: IPost[] = []; // Храним посты которые отображаем
  user: IUser = null;
  category: ICategory = null; // Сохраняем выбор из других компонентов если он есть
  subject: ISubject = null; // Сохраняем выбор из других компонентов если он есть
  author: string = null;
  searchTerm: string = null;
  viewPost: IPost = null;

  // Подписки для очистки памяти
  pSub: Subscription = null;
  cSub: Subscription = null;
  sSub: Subscription = null;
  aSub: Subscription = null;
  vSub: Subscription = null;
  uSub: Subscription = null;
  searchSub: Subscription = null;

  constructor(
    private viewServise: ViewService,
    private dataService: DataService,
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    /*
      А вот сейчас будет весело, как я и говорил, есть переменная allPosts и viewPosts.
      К allPosts мы обращаемся только чтобы забирать данные, но никак не фильтровать.
    */
    this.user = this.dataService.DecryptUser();
    this.pSub = this.viewServise.allPosts.subscribe((data) => {
      this.allPosts = data;
    });
    this.vSub = this.viewServise.currentPost.subscribe((data) => {
      this.viewPosts = data;
    });
    this.sSub = this.viewServise.selectedSubject.subscribe((data) => {
      this.subject = data;
      if(data !== null){
        this.CheckFilter();
      }
    });
    this.cSub = this.viewServise.selectedCategory.subscribe((data) => {
      this.category = data;
      if(data !== null){
        this.CheckFilter();
      }
    });
    this.aSub = this.viewServise.selectedAuthor.subscribe((data) => {
      this.author = data;
      if(data !== null){
        this.CheckFilter();
      }
    });
    this.searchSub = this.viewServise.searchTermChange.subscribe((data) => {
      this.searchTerm = data;
      if(data !== null){
        this.CheckFilter();
      }
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

  CheckFavorite(post: IPost){
    if(this.user !== null){
      let arr = this.user.favorites;
      for(let fav in arr){
        if(arr[fav] === post._id){
          return true;
        }
      }
    }
    return false;
  }

  ChangeFavorite(post: IPost){
    if(this.CheckFavorite(post)){
      this.user.favorites = this.user.favorites.filter(item => item !== post._id);
      this.viewServise.ChangeUser(this.user);
      this.dataService.SetUser(this.user);
      this.reqService.ChangeUser(this.user).subscribe((data) => {
        if(data.message === 'Updated'){
          alert('Пост удалён из избранного');
          let ind = this.viewPosts.indexOf(post);
          if (ind >= 0) {
            this.viewPosts.splice( ind, 1 );
            this.viewServise.ChangePosts(this.viewPosts);
          }
        }
        else{
          alert('Сейчас невозможно убрать пост из избранного, попробуйте позже');
        }
      });
    }
    else{
      this.user.favorites.push(post._id);
      this.viewServise.ChangeUser(this.user);
      this.dataService.SetUser(this.user);
      this.reqService.ChangeUser(this.user).subscribe((data) => {
        if(data.message === 'Updated'){
          alert('Пост добавлен в избранное');
        }
        else{
          alert('Сейчас невозможно убрать пост из избранного, попробуйте позже');
        }
      });
    }
  }

  private CheckFilter(){
    this.viewPosts = this.allPosts;
    if(this.viewPosts === null){
      this.viewPosts = this.allPosts;
    }
    if(this.category !== null){
      let newArr = [];
      this.allPosts.forEach(post => {
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

  ViewFile(){
    window.open(`http://localhost:4000/${this.viewPost.fileUrl}`);
  }

  ViewPost(post: IPost){
    this.viewPost = post;
  }

}

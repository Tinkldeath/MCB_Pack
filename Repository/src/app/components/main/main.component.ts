import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { IPost, ICategory, ISubject } from 'src/app/shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  allPosts: IPost[] = []; // Храним все посты
  viewPosts: IPost[] = []; // Храним посты которые отображаем
  category: ICategory = null; // Сохраняем выбор из других компонентов если он есть
  subject: ISubject = null; // Сохраняем выбор из других компонентов если он есть

  // Подписки для очистки памяти, многие я не почистил
  pSub: Subscription = null;
  cSub: Subscription = null;
  sSub: Subscription = null;
  aSub: Subscription = null;
  vSub: Subscription = null;

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
    this.cSub = this.viewServise.selectedCategory.subscribe((data) => {
      this.category = data;
      /*
        Обрати внимание, что подписываемся мы на новую переменную из ViewService, которая отвечает как раз за выбор в
        инпутах и селектах. Если она ненулевая, мы сразу фильтруем массив,
        если нулевая, то отображаем всё, забирая значения из allPosts.
        На этом же принципе строятся и остальные подписки, по идее всё должно работать нормально
      */
      if(this.category !== null){
        let newArr = [];
        this.allPosts.forEach(post => {
          if(post.category === this.category.name){
            newArr.push(post);
          }
        });
        /*
          Тут мы меняем посты для того, чтобы в других местах отображались и отфильтрованные посты,
          в том числе и в нашем компоненте, т.к. у нас активная подписка лежит в переменной vSub.
          ВНИМАНИЕ, не в pSub, а в vSub. pSub нужен только для хранения всех постов, чтобы в случае
          сброса поискового фильтра не терять все посты в отображении. Все отфильтрованные посты лежат
          только в переменной currentPost, на которую нужно подписываться везде, где ты хочешь отображать посты.
          При проверке остальных критериев ниже принцип тот же самый, теперь идём в компонент view-categories.ts
        */
        this.viewServise.ChangePosts(newArr);
      }
      else{
        this.viewPosts = this.allPosts;
      }
    });
    this.sSub = this.viewServise.selectedSubject.subscribe((data) => {
      this.subject = data;
      if(this.subject !== null){
        let newArr = [];
        this.viewPosts.forEach(post => {
          if(post.subject === this.subject.name){
            newArr.push(post);
          }
        });
        this.viewServise.ChangePosts(newArr);
      }
    });
    this.aSub = this.viewServise.selectedAuthor.subscribe((data) => {
      if(data !== null){
        let newArr = [];
        this.viewPosts.forEach(post => {
          if(post.author === data){
            newArr.push(post);
          }
        });
        this.viewServise.ChangePosts(newArr);
      }
    });
  }

}

import { ICategory } from './../../shared/models/models';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { ISubject } from 'src/app/shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.scss'],
})
export class ViewSubjectsComponent implements OnInit, OnDestroy {

  selectedSubject: string = null;
  sub: ISubject = null;
  allSubjects: ISubject[] = [];
  cat: ICategory = null;
  categories: ICategory[] = [];
  viewSubjects: ISubject[] = [];

  aSub: Subscription = null;
  vSub: Subscription = null;
  cSub: Subscription = null;
  vsSub: Subscription = null;
  vcSub: Subscription = null;

  constructor(
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.aSub = this.viewService.allSubjects.subscribe((data) => {
      this.allSubjects = data;
    });
    this.vcSub = this.viewService.currentCategories.subscribe((data) => {
      this.categories = data;
    });
    this.vsSub = this.viewService.currentSubject.subscribe((data) => {
      this.viewSubjects = data;
    });
    this.vSub = this.viewService.selectedSubject.subscribe((data) => {
      this.sub = data;
      if(this.sub !== null){
        this.selectedSubject = this.sub.name;
      }
      else{
        this.selectedSubject = null;
      }
    });
    this.cSub = this.viewService.selectedCategory.subscribe((data) => {
      this.cat = data;
      if(this.cat !== null){
        let newArr = [];
        this.allSubjects.forEach(subject => {
          if(subject.categoryName === this.cat.name){
            newArr.push(subject);
          }
        });
        this.viewService.ChangeSubjects(newArr);
      }
      else{
        this.viewService.ChangeSubjects(this.allSubjects);
      }
    });
  }

  ngOnDestroy() {
    if(this.vsSub !== null){
      this.vsSub.unsubscribe();
    }
    if(this.cSub !== null){
      this.cSub.unsubscribe();
    }
    if(this.vcSub !== null){
      this.vcSub.unsubscribe();
    }
    if(this.vSub !== null){
      this.vSub.unsubscribe();
    }
    if(this.aSub !== null){
      this.aSub.unsubscribe();
    }
  }

  SelectSubject(){
    for(let subject of this.viewSubjects){
      if(subject.name === this.selectedSubject){
        this.viewService.ChangeViewSubject(subject);
        if(this.cat === null){
          for(let category of this.categories){
            if(category.name === subject.categoryName){
              this.viewService.ChangeViewCategory(category);
              return;
            }
          }
        }
      }
    }
  }
}

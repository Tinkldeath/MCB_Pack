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
  cat: ICategory = null;
  subjects: ISubject[] = [];
  viewSubjects: ISubject[] = [];

  sSub: Subscription = null;
  vSub: Subscription = null;
  cSub: Subscription = null;
  vsSub: Subscription = null;

  constructor(
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.sSub = this.viewService.allSubjects.subscribe((data) => {
      this.subjects = data;
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
        this.subjects.forEach(subject => {
          if(subject.categoryName === this.cat.name){
            newArr.push(subject);
          }
        });
        this.viewService.ChangeSubjects(newArr);
      }
    });
  }

  ngOnDestroy() {
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
  }

  SelectSubject(){
    for(let subject of this.subjects){
      if(subject.name === this.selectedSubject){
        this.viewService.ChangeViewSubject(subject);
        break;
      }
    }
  }
}

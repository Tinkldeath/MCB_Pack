import { ISubject } from './../../shared/models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit, OnDestroy {

  subjects: ISubject[] = [];
  sSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.sSub = this.reqService.GetSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  ngOnDestroy(){
    if(this.sSub !== null){
      this.sSub.unsubscribe();
    }
  }

  DeleteSubject(subject: ISubject){
    const delSubject = {
      _id: subject._id
    }
    this.reqService.DeleteSubject(delSubject).subscribe((data) => {
      if(data.message === 'Deleted'){
        alert('Предмет удалён');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

}

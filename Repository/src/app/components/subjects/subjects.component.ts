import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ISubject } from 'src/app/shared/models/models';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  
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

}

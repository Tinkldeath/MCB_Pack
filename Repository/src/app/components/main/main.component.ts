import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { IPost } from 'src/app/shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  posts: IPost[] = [];
  pSub: Subscription = null;
  selection: string = '';

  constructor(
    private reqService: RequestsService,
    private viewServise: ViewService
  ) { }

  ngOnInit() {
    this.pSub = this.reqService.GetPosts().subscribe((data) => {
      this.posts = data;
    });
  }

}

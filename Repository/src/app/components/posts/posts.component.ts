import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/models/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  pSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.pSub = this.reqService.GetPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnDestroy(){
    if(this.pSub !== null){
      this.pSub.unsubscribe();
    }
  }
}

import { Subscription } from 'rxjs';
import { ViewService } from 'src/app/shared/services/view.service';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/models';

@Component({
  selector: 'app-view-authors',
  templateUrl: './view-authors.component.html',
  styleUrls: ['./view-authors.component.scss'],
})
export class ViewAuthorsComponent implements OnInit {

  selectedAuthor: string = null;
  authors: string[] = [];
  posts: IPost[] = [];
  pSub: Subscription = null;
  vSub: Subscription = null;

  constructor(
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.pSub = this.viewService.currentPost.subscribe((data) => {
      this.posts = data;
      if(this.posts !== null){
        this.posts.forEach(post => {
          let found = false;
          this.authors.forEach(author => {
            if(author === post.author){
              found = true;
            }
          });
          if(found === false){
            this.authors.push(post.author);
          }
        });
      }
    });
    this.vSub = this.viewService.selectedAuthor.subscribe((data) => {
      if(data !== null){
        this.selectedAuthor = data;
      }
      else{
        this.selectedAuthor = null;
      }
    });
  }

  SelectAuthor(){
    for(let author of this.authors){
      if(author === this.selectedAuthor){
        this.viewService.ChangeViewAuthor(author);
        break;
      }
    }
  }

}

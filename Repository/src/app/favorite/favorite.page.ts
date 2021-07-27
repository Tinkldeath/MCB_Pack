import { User } from './../shared/models/models';
import { Component, OnInit } from '@angular/core';
import { ViewService } from '../shared/services/view.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  user: User = null;

  constructor(
    private viewService: ViewService
  ) {
    this.viewService.currentMessage.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

}

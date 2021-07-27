import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  login: string = null;

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.login = this.dataService.GetLogin();
  }

}

import { ViewService } from 'src/app/shared/services/view.service';
import { DataService } from './../../shared/services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUser} from '../../shared/models/models';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  selection: string = '';
  user: IUser = null;

  constructor(
    private router: Router,
    private dataService: DataService,
    private viewService: ViewService
  ) {}

  ngOnInit() {
    this.user = this.dataService.DecryptUser();
  }

  Logout(){
    localStorage.clear();
    localStorage.clear();
    sessionStorage.clear();
    this.dataService.SetUser(null);
    this.dataService.Clear();
    this.viewService.ChangeMessage(null);
    this.router.navigateByUrl('home');
  }

  Change(message: string){
    this.selection = message;
  }

  Reset(){
    this.selection = '';
  }
}

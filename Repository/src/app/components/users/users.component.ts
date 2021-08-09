import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/shared/models/models';
import { RequestsService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {

  users: IUser[] = [];
  uSub: Subscription = null;

  constructor(
    private reqService: RequestsService
  ) { }

  ngOnInit() {
    this.reqService.GetUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    if(this.uSub !== null){
      this.uSub.unsubscribe();
    }
  }

  DeleteUser(user: IUser){
    this.reqService.DeleteUser(user).subscribe((data) =>{
      if(data.message === 'Deleted'){
        alert('Пользователь удален');
        this.ngOnInit();
      }
      else{
        alert('Ошибка на стороне серера, попробуйте позже');
      }
    });
  }

}

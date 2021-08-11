import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/shared/models/models';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {

  users: IUser[] = [];
  uSub: Subscription = null;
  newIsAdmin: boolean = null;
  newIsModer: boolean = null;
  userToEdit: IUser = null;

  constructor(
    private reqService: RequestsService,
    private authServise: AuthService
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

  SelectUser(user: IUser){
    this.userToEdit = user;
    this.newIsAdmin = this.userToEdit.isAdmin;
    this.newIsModer = this.userToEdit.isModer;
  }

  ChangeAdmin(){
    this.newIsAdmin = !this.newIsAdmin;
  }

  ChangeModer(){
    this.newIsModer = !this.newIsModer;
  }

  ChangeUser(){

    const user = {
      _id: this.userToEdit._id,
      isAdmin: this.newIsAdmin,
      isModer: this.newIsModer
    }

    if(this.userToEdit.isAdmin === this.newIsAdmin && this.userToEdit.isModer === this.newIsModer){
      alert('Вы ничего не изменили');
      return;
    }
    else{
      this.reqService.ChangeUser(user).subscribe((data) => {
        if(data.message === 'Updated'){
          alert('Пользователь обновлён');
          this.userToEdit = null;
          this.ngOnInit();
        }
        else{
          alert('Ошибка на стороне серера, попробуйте позже');
        }
      });
    }
  }

}

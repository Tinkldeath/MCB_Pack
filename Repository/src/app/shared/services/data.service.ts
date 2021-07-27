import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  SaveUser(inUser: User){
    localStorage.setItem('id',inUser._id);
    localStorage.setItem('token',inUser.token);
    localStorage.setItem('login',inUser.login);
    localStorage.setItem('isAdmin',inUser.isAdmin);
    localStorage.setItem('isModer',inUser.isModer);
    localStorage.setItem('stays',inUser.stays);
  }

  DeleteUser(){
    localStorage.clear();
  }

  GetToken(){
    return localStorage.getItem('token');
  }

  GetLogin(){
    return localStorage.getItem('login');
  }

  GetAdmin(){
    return localStorage.getItem('isAdmin');
  }

  GetModer(){
    return localStorage.getItem('isModer');
  }

  GetId(){
    return localStorage.getItem('id');
  }

  GetStays(){
    return localStorage.getItem('stays');
  }

}

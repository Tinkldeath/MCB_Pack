import { IUser } from './../models/models';
import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private user: IUser = null;

  constructor(){}

  SetUser(inUser: IUser){
    this.user = inUser;
    const encrypted = crypto.AES.encrypt(JSON.stringify(inUser), 'secret key').toString();
    localStorage.setItem('user',encrypted);
  }

  SetUserSession(inUser: IUser){
    this.user = inUser;
    const encrypted = crypto.AES.encrypt(JSON.stringify(inUser), 'secret key').toString();
    sessionStorage.setItem('user',encrypted);
  }

  DecryptUser(){
    if(localStorage.getItem('user') !== null && !this.user){
      const bytes  = crypto.AES.decrypt(localStorage.getItem('user'), 'secret key');
      const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
      this.user = decryptedData;
    }
    else if(sessionStorage.getItem('user') !== null && !this.user){
      const bytes  = crypto.AES.decrypt(sessionStorage.getItem('user'), 'secret key');
      const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
      this.user = decryptedData;
    }
    return this.user;
  }

  Clear(){
    this.user = null;
    localStorage.clear();
  }
}

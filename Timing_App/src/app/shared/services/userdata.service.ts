import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(
    public storage: Storage,
  ){}

  setUserData(groupName:string,groupId: string, stay: boolean){
    this.storage.set('groupId',groupId);
    this.storage.set('stay',stay);
    this.storage.set('groupName',groupName);
    console.log('Data saved');
  }

  getGroupName(){
    return this.storage.get('groupName');
  }

  getGroupId(){
    return this.storage.get('groupId');
  }

  getStay(){
    return this.storage.get('stay');
  }

  clearData(){
    this.storage.clear();
    console.log('Data removed');
  }

}

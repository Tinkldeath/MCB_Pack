import { Injectable } from '@angular/core';
import { Special, Group, Schedule, Pair } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  groupId: string;
  specials: Special[] = [];
  groups: Group[] = [];
  groupNames: string[] = [];
  specNames: string[] = [];
  schedules: Schedule[] = [];
  pairsChisl: Pair[] = [];
  parisZnam: Pair[] = [];

  constructor(){}

//=========================================================== Groups

  saveGroupId(id:string){
    this.groupId = id;
    console.log(this.groupId);
  }

  giveGroupId(){
    return this.groupId;
  }

  saveGroups(grps: Group[]){
    this.groupNames = [];
    this.groups = grps;
    for(let group of this.groups){
      this.groupNames.push(group.groupName);
    }
  }

  findGroupByName(name: string){
    for(let i = 0; i < this.groupNames.length;i++){
      if(this.groupNames[i] == name){
        return this.groups[i];
      }
    }
  }

//===========================================================


//=========================================================== Specials

  saveSpecials(specs: Special[]){
    this.specials = specs;
    for(let spec of this.specials){
      this.specNames.push(spec.specName);
    }
  }

  findSpecialByName(name: string){
    for(let i = 0; i < this.specNames.length;i++){
      if(this.specNames[i] == name){
        return this.specials[i];
      }
    }
  }

//===========================================================


//=========================================================== Schedules

  saveSchedules(scheds: Schedule[]){
    this.schedules = scheds;
    if(scheds[0].chisl === true){
      this.pairsChisl = scheds[0].pairs;
      this.parisZnam = scheds[1].pairs;
    }
    else if(scheds[1].chisl === true){
      this.pairsChisl = scheds[1].pairs;
      this.parisZnam = scheds[0].pairs;
    }
  }

  givePairsChisl(){
    return this.pairsChisl;
  }

  givePairsZnam(){
    return this.parisZnam;
  }

//===========================================================

}

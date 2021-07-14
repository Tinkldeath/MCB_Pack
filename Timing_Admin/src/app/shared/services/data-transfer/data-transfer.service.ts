import { Groups } from 'src/app/shared/data/localdata';
import { Specials, Schedules } from './../../data/localdata';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  schedulesArr: Schedules[];
  schedule: Schedules;
  special: Specials;
  group: Groups;

  constructor() {}

  //===================================================================== Specials interface

  saveSpecial(spec: Specials){
    this.special = spec;
  }

  giveSpecialId(){
    return this.special._id;
  }

  giveSpecialName(){
    return this.special.specName;
  }

  giveSpecial(){
    return this.special;
  }

  //=====================================================================


  //===================================================================== Groups interface

  saveGroup(grp: Groups){
    this.group = grp;
  }

  giveGroupId(){
    return this.group._id;
  }

  giveGroupSpecId(){
    return this.group.specId;
  }

  giveGroupName(){
    return this.group.groupName;
  }

  giveGroup(){
    return this.group;
  }

  //=====================================================================


  //===================================================================== Schedules interface

  saveSchedulesArr(sched: Schedules[]){
    this.schedulesArr = sched;
  }

  giveSchedulesArr(){
    return this.schedulesArr;
  }

  saveSchedule(sched: Schedules){
    this.schedule = sched;
  }

  giveSchedule(){
    return this.schedule;
  }

  giveScheduleChisl(){
    return this.schedule.chisl;
  }

  giveScheduleId(){
    return this.schedule._id;
  }

  giveScheduleGroupId(){
    return this.schedule.groupId;
  }

  giveSchedulePairs(){
    return this.schedule.pairs;
  }

  //=====================================================================
}

import { Schedules, Pairs } from './../../data/localdata';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  apiUrl: string = 'http://localhost:4000/api';
  cmp: Schedules[] = [];

  constructor(private http: HttpClient) { }

  getByGroupId(groupId:string) : Observable<Schedules[]>{
    return this.http.get<Schedules[]>(`${this.apiUrl}/schedule/${groupId}`);
  }

  deleteById(id:string){
    return this.http.delete(`${this.apiUrl}/schedule/${id}`);
  }

  updateById(id:string,newPairs: Pairs[]){
    const body = {newPairs:newPairs};
    return this.http.patch(`${this.apiUrl}/schedule/${id}`,body);
  }

  addSchedule(groupId: string,chisl: boolean){
    const body = {groupId: groupId,chisl: chisl};
    return this.http.post(`${this.apiUrl}/schedule/add`,body);
  }

  deleteAll(groupId: string){
    return this.http.delete(`${this.apiUrl}/schedule/${groupId}`);
  }
}

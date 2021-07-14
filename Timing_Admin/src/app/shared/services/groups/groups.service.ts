import { Observable } from 'rxjs';
import { Groups } from './../../data/localdata';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  apiUrl:string = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {
  }

  getAll(specId: string): Observable<Groups[]>{
    return this.http.get<Groups[]>(`${this.apiUrl}/groups/${specId}`);
  }

  deleteById(id:string){
    return this.http.delete(`${this.apiUrl}/groups/${id}`);
  }

  addGroup(specId:string,groupName: string, courseNumber:number) : Observable<Groups>{
    const body = {specId: specId, groupName: groupName, courseNumber: courseNumber}
    return this.http.post<Groups>(`${this.apiUrl}/groups/add/${specId}`,body);
  }

  updateGroup(id: string, newName: string, course: number){
    const body = {groupName: newName, courseNumber: course};
    return this.http.patch<Groups>(`${this.apiUrl}/groups/${id}`,body);
  }
}

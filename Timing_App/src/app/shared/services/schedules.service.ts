import { Schedule } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  apiUrl: string = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient,
  ) {}

  getSchedules(groupId: string) : Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.apiUrl}/schedule/${groupId}`);
  }
}

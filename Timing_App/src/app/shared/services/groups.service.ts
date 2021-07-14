import { Group} from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  apiUrl: string = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient,
  ) {}

  getGroups(specId: string): Observable<Group[]>{
    return this.http.get<Group[]>(`${this.apiUrl}/groups/${specId}`);
  }
}

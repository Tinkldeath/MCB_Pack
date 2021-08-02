import { ICategory, ISubject, IPost, IUser } from './../models/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/assets/keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient
  ) { }

  GetCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${apiUrl}/categories/all`);
  }

  GetSubjects() : Observable<ISubject[]>{
    return this.http.get<ISubject[]>(`${apiUrl}/subjects/all`);
  }

  GetPosts() : Observable<IPost[]>{
    return this.http.get<IPost[]>(`${apiUrl}/post/all`);
  }

  GetUsers() : Observable<IUser[]>{
    return this.http.get<IUser[]>(`${apiUrl}/users/all`);
  }

}

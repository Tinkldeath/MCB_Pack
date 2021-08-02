import { Category, ISubject } from './../models/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/assets/keys';
import { HttpClient } from '@angular/common/http';
import { Post } from './../models/models';
import { IUser } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient
  ) { }

  GetCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${apiUrl}/categories/all`);
  }

  GetSubjects() : Observable<ISubject[]>{
    return this.http.get<ISubject[]>(`${apiUrl}/subjects/all`);
  }

  GetPosts() : Observable<Post[]>{
    return this.http.get<Post[]>(`${apiUrl}/post/all`);
  }

  GetUsers() : Observable<IUser[]>{
    return this.http.get<IUser[]>(`${apiUrl}/users/all`); 
  }
  
}

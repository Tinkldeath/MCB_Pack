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


  //============================================================== Get requests
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
  //==============================================================


  //============================================================== Post requests
  AddCategory(newCategory: {name: string, description: string}) : Observable<{message: string}>{
    return this.http.post<{message: string}>(`${apiUrl}/categories/add`,newCategory);
  }

  AddSubject(newSubject: {categoryId: string, name: string}) : Observable<{message: string}>{
    return this.http.post<{message: string}>(`${apiUrl}/subjects/add`,newSubject);
  }
  //==============================================================


  //============================================================== Patch requests
  //==============================================================


  //============================================================== Delete requests
  DeleteCategory(category: {_id: string}) : Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${apiUrl}/categories/delete/${category._id}`);
  }
  DeleteSubject(subject: {_id: string}) : Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${apiUrl}/subjects/delete/${subject._id}`);
  }
  //==============================================================
}

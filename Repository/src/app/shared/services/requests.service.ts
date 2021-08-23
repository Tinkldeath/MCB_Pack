import { Router } from '@angular/router';
import { DataService } from './data.service';
import { ICategory, ISubject, IPost, IUser } from './../models/models';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from 'src/assets/keys';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) { }

  private GetToken(){
    const user: IUser = this.dataService.DecryptUser();
    if(user === null || user === undefined){
      return null;
    }
    else{
      return user.token;
    }
  }

  private HandleError(error: HttpErrorResponse){
    if(error.status === 401){
      alert('Необходимо заново войти в систему');
      localStorage.clear();
      sessionStorage.clear();
      this.dataService.SetUser(null);
      this.dataService.SetUserSession(null);
      this.dataService.Clear();
      this.router.navigateByUrl('sign-in');
    }
    else if(error.status === 404){
      console.log('Bad request');
    }
  }

  //============================================================== Get requests
  GetCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${apiUrl}/categories/all`);
  }

  GetSubjects() : Observable<ISubject[]>{
    return this.http.get<ISubject[]>(`${apiUrl}/subjects/all`);
  }

  GetPosts() : Observable<IPost[]>{
    return this.http.get<IPost[]>(`${apiUrl}/posts/all`);
  }

  GetUsers() : Observable<IUser[]>{
    let token = this.GetToken();
    return this.http.get<IUser[]>(`${apiUrl}/users/all`,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      })
    );
  }
  //==============================================================


  //============================================================== Post requests
  AddCategory(newCategory: {name: string, description: string}) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.post<{message: string}>(`${apiUrl}/categories/add`,newCategory,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }

  AddSubject(newSubject: {categoryName: string, name: string}) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.post<{message: string}>(`${apiUrl}/subjects/add`,newSubject,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }

  AddPost(post: any) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.post<{message: string}>(`${apiUrl}/posts/add`,post,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  //==============================================================


  //============================================================== Patch requests
  ChangeCategory(category: ICategory) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/categories/update`, category,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  ChangeSubject(subject: ISubject) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/subjects/update`, subject,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  ChangePost(post: FormData) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/posts/update`, post,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }

  ChangeUser(userToChange: any) : Observable<{message:string}>{
    let token = this.GetToken();
    return this.http.patch<{message: string}>(`${apiUrl}/users/update`,userToChange,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  //==============================================================


  //============================================================== Delete requests
  DeleteCategory(category: {_id: string}) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.delete<{message: string}>(`${apiUrl}/categories/delete/${category._id}`,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  DeleteSubject(subject: {_id: string}) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.delete<{message: string}>(`${apiUrl}/subjects/delete/${subject._id}`,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  DeleteUser(userToChange: IUser) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.delete<{message: string}>(`${apiUrl}/users/delete/${userToChange._id}`,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  DeletePost(id: string) : Observable<{message: string}>{
    let token = this.GetToken();
    return this.http.delete<{message: string}>(`${apiUrl}/posts/delete/${id}`,{headers: {['Authorization']: `${token}`}}).pipe(
      catchError((err,src) => {
        this.HandleError(err);
        return throwError(err);
      }));
  }
  //==============================================================
}

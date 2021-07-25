import { Category } from './../models/models';
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

  GetCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${apiUrl}/categories/all`);
  }

}

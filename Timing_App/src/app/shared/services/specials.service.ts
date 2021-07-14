import { Special } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialsService {

  apiUrl: string = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient,
  ){}

  getSpecials() : Observable<Special[]>{
    return this.http.get<Special[]>(`${this.apiUrl}/specials/`);
  }
}

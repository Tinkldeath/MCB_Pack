import { Specials } from './../../data/localdata';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SpecialsService {

  apiUrl: string = 'http://localhost:4000/api';

  constructor(private http:HttpClient,) {}

  getSpecials(): Observable<Specials[]>{
    return this.http.get<Specials[]>(`${this.apiUrl}/specials`);
  }

  deleteSpecial(specId: string){
    return this.http.delete(`${this.apiUrl}/specials/delete/${specId}`);
  }

  addSpecial(newSpecName: string){
    const body = {specName: newSpecName}
    return this.http.post(`${this.apiUrl}/specials/add`,body);
  }

  updateSpecial(id: string,newName: string){
    const body = {specName: newName};
    return this.http.patch(`${this.apiUrl}/specials/update/${id}`,body);
  }
}


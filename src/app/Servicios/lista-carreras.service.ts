import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from '../Models/carreras.model';
import { ApiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CarreraListService {
  private apiUrl = `${ApiUrl}/carreras`;

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }
}

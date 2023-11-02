import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../Models/provincias.model';
import { ApiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaListService {
  constructor(private http: HttpClient) {}

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${ApiUrl}/provincias`);
  }
}

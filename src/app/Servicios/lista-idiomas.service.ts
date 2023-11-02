import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constants';
import { Idiomas } from '../Models/idiomas.model';

@Injectable({
  providedIn: 'root',
})
export class IdiomasListService {
  constructor(private http: HttpClient) {}

  getIdiomas(): Observable<Idiomas[]> {
    return this.http.get<Idiomas[]>(`${ApiUrl}/idioma`);
  }
}

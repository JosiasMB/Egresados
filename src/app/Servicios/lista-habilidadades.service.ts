import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidad } from '../Models/habilidades.model';
import { ApiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HabilidadListService {
  constructor(private http: HttpClient) {}

  getHabilidades(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(`${ApiUrl}/habilidades`);
  }
}

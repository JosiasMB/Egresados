import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class EgresadoListService {
  constructor(private http: HttpClient) {}

  getEgresadosPaginados(
    page: number,
    itemsPerPage: number,
    q: any = null
  ): Observable<any> {
    // const startIndex = (page - 1) * itemsPerPage;
    let apiUrl = `${ApiUrl}/egresado?_page=${page}&_limit=${itemsPerPage}&_embed=experienciaLaboralEgresado&_embed=contacto&_embed=educacion&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=egresadosHabilidad&_embed=direccionEgresado`;
    if (q) {
      apiUrl += `&q=${q}`;
    }
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }
}

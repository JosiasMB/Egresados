import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl, ApiUrlv2 } from '../constants';
import { Egresado } from '../Models/egresado.model';

@Injectable({
  providedIn: 'root',
})
export class EgresadoListService {
  constructor(private http: HttpClient) {}

  

  filterEgresados(egresadosFilters: any, page?: any, q: any = undefined) {
    const params = new HttpParams()
      .set('destacados', egresadosFilters.destacados)
      .set('rangoFechaInicio', egresadosFilters.rangoFechaInicio || null)
      .set('rangoFechaFin', egresadosFilters.rangoFechaFin ||  null)
      .set('habilidades', JSON.stringify(egresadosFilters.habilidades))
      .set('provincias', JSON.stringify(egresadosFilters.provincias))
      .set('tituloTipos', JSON.stringify(egresadosFilters.tituloTipos))
      .set('dateRangeDisabled', egresadosFilters.dateRangeDisabled)
      .set('q', q)
      .set('page', page);

    return this.http.get<Egresado[]>(`${ApiUrlv2}/egresados/filter`, {
      params: params,
    });
  }

  getEgresadosPaginados(
    page: number,
    itemsPerPage: number,
    q: any = null
  ): Observable<any> {
    let apiUrl = `${ApiUrl}/egresado?_page=${page}&_limit=${itemsPerPage}&_embed=experienciaLaboralEgresado&_embed=contacto&_embed=educacion&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=egresadosHabilidad&_embed=direccionEgresado`;
    if (q) {
      apiUrl += `&q=${q}`;
    }
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }
  getCandidatos(page: number, q: any = null): Observable<any> {
    let apiUrl = `${ApiUrlv2}/egresados/candidatos?_page=${page}&q=${q}`;
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }
}

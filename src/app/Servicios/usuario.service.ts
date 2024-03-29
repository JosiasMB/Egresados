import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl, ApiUrlv2, cloudinary } from '../constants';
import { Egresado } from '../Models/egresado.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SHA1 } from 'crypto-js';
import { authorizeUser } from '../shared/authorizeUser';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieSevise: CookieService
  ) {}

  private isAuthenticated = false;
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUser(id: any): Observable<Egresado> {
    return new Observable<Egresado>((observer) => {
      authorizeUser(
        { params: { userId: id }, user: { id: id } },
        {
          status: (code: number) => {
            return {
              json: (data: { message: string }) => {
                console.log(data.message);
                observer.error(data.message);
              },
            };
          },
        },
        () => {
          const api = `${ApiUrl}/egresado/${id}?_embed=experienciaLaboralEgresado&_embed=contacto&_embed=educacion&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=egresadosHabilidad&_embed=direccionEgresado&_embed=usuario`;
          this.http.get<Egresado>(api).subscribe(
            (data) => {
              observer.next(data);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        }
      );
    });
  }

  logOut() {
    this.cookieSevise.delete('token');
    this.router.navigateByUrl('/login');
  }

  login(email: string, password: string) {
    return this.http.post(`${ApiUrlv2}/auth/login`, { email, password });
  }

  // All delete Request

  deleteExperience(id: any) {
    return this.http.delete(`${ApiUrl}/ExperienciaLaboralEgresado/${id}`);
  }

  deleteEducacion(id: any) {
    return this.http.delete(`${ApiUrl}/educacion/${id}`);
  }

  deleteContacto(id: any) {
    return this.http.delete(`${ApiUrl}/contacto/${id}`);
  }

  deleteHabilidades(id: any) {
    return this.http.delete(`${ApiUrl}/egresadosHabilidad/${id}`);
  }

  deleteIdioma(id: any) {
    return this.http.delete(`${ApiUrl}/idiomaEgresado/${id}`);
  }
  deleteDireccion(id: any) {
    return this.http.delete(`${ApiUrl}/direccionEgresado/${id}`);
  }

  // All updates Request
  agregarIdioma(idioma: any) {
    return this.http.post(`${ApiUrl}/idiomaEgresado`, idioma);
  }

  agregarHabilidad(habilidad: any) {
    return this.http.post(`${ApiUrl}/egresadosHabilidad`, habilidad);
  }

  agregarExperience(experiencia: any) {
    return this.http.post(`${ApiUrl}/ExperienciaLaboralEgresado`, experiencia);
  }

  agregarEducacion(educacion: any) {
    return this.http.post(`${ApiUrl}/educacion`, educacion);
  }

  agregarContacto(contacto: any) {
    return this.http.post(`${ApiUrl}/contacto`, contacto);
  }
  agregarDireccion(direccion: any) {
    return this.http.post(`${ApiUrl}/direccionEgresado`, direccion);
  }

  actualizarInformacionPrimariaDelUsuario(informacion: any, id: number) {
    return this.http.patch(`${ApiUrl}/egresado/${id}`, informacion);
  }

  getProfilePicFormData(image: any, egresadoId: number) {
    const formData = new FormData();
    const timestamp = new Date().getTime();
    const eager = cloudinary.eager;
    const public_id = `egresado-id-${egresadoId}`;
    const api_secret = cloudinary.api_secret;
    const file = image; //this.DataURIToBlob(image.dataUrl);

    formData.append('file', file);
    formData.append('cloud_name', cloudinary.cloud_name);
    formData.append('public_id', public_id);
    formData.append('api_key', cloudinary.api_key);
    formData.append('folder', cloudinary.profilePic_folter);
    formData.append('timestamp', `${timestamp}`);
    formData.append('eager', eager);
    formData.append('upload_preset', 'ml_default');

    const serielizedSignature = `eager=${eager}&folder=egresados-uasd/profilePics&public_id=${public_id}&timestamp=${timestamp}&upload_preset=ml_default`;
    const signature = SHA1(serielizedSignature + api_secret);

    formData.append('signature', `${signature}`);

    return formData;
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  // Llamar funcion y pasar form data
  uploadEgresadoProfilePic(data: any): Observable<any> {
    return this.http.post(cloudinary.upload_url, data);
  }
  cambiarContrasena(password: string, id: number) {
    const body = { password: password };
    return this.http.patch(`${ApiUrl}/usuario/${id}`, body);
  }

  recuperarPassword(email: string): Observable<any> {
    return this.http.put(`${ApiUrlv2}/auth/update-password`, { email });
  }
  setNewPassword(token: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('reset', `${token}`);
    return this.http.put(
      `${ApiUrlv2}/auth/reset-password`,
      { password },
      { headers }
    );
  }
}

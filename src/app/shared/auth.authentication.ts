import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { cloudinary } from '../constants';
@Injectable()
export class tokentAuth implements HttpInterceptor {
  constructor(private cookieSevise: CookieService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.cookieSevise.get('token');

    if (token && request.url !== cloudinary.upload_url) {
      request = request.clone({
        setHeaders: {
          Authorization: `jwt ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

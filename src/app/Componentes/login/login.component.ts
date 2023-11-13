import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { KeyId } from 'src/app/constants';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    public cookieService: CookieService
  ) {}

  ngOnInit(): void {}
  showLoading: boolean = false;

  login() {
    this.showLoading = true;
    this.usuarioService
      .login(this.email, this.password)
      .subscribe((data: any) => {
        const newDate = new Date();
        newDate.setMinutes(newDate.getMinutes() + 30);
        this.cookieService.set('token', data.token, newDate);
        this.userId(data.userId);
        this.router.navigateByUrl(`/usuario/${data.userId}`);
      });
  }

  userId(id: any) {
    const encryptedData = CryptoJS.AES.encrypt(id.toString(), KeyId).toString();
    localStorage.setItem('userId', encryptedData);
  }
}

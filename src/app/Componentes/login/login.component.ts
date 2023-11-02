import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  ngOnInit(): void {
    this.usuarioGuardadoEnMemoria();
  }

  UsuarioLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      return JSON.parse(storedUser);
    }
  }

  usuarioGuardadoEnMemoria() {
    if (localStorage.getItem('user')) {
      const email = this.UsuarioLocalStorage()[0].email;
      const password = this.UsuarioLocalStorage()[0].password;
      this.usuarioService.login(email, password);
    }
  }
  showLoading: boolean = false;

  login() {
    this.showLoading = true;

    this.usuarioService
      .login(this.email, this.password)
      .subscribe((data: any) => {
        const newDate = new Date();
        newDate.setMinutes(newDate.getMinutes() + 30);
        this.cookieService.set('token', data.token, newDate);
        this.router.navigateByUrl(`/usuario/${data.userId}`);
      });
  }
}

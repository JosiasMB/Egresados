import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  mensaje: string = '';
  token: string = '';

  constructor(
    public router: Router,
    public userService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  guardarCambios() {
    this.loading = true;
    if (this.password === this.confirmPassword) {
      this.userService
        .setNewPassword(this.token, this.confirmPassword)
        .subscribe((data) => {
          console.log(data);
          return (this.mensaje = 'Se ha actualizado la contraseña');
        });
    } else {
      console.log('Las contraseñas no coinciden');
    }
    this.loading = false;
  }
}

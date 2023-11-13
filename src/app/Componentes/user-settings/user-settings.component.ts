import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  mensaje: string = '';
  id: any;
  constructor(
    public router: Router,
    public userService: UsuarioService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  guardarCambios() {
    this.loading = true;
    if (this.password === this.confirmPassword) {
      this.userService
        .cambiarContrasena(this.confirmPassword, this.id)
        .subscribe((data) => {
          return (this.mensaje = 'Se ha actualizado la contraseña');
        });
    } else {
      console.log('Las contraseñas no coinciden');
    }
    this.loading = false;
  }
}

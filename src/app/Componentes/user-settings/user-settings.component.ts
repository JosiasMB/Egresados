import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('switch')
  switch!: ElementRef;

  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  mensaje: string = '';
  Activo: boolean = false;
  Activo2: boolean = true;
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
    this.getEgresado();
  }

  guardarCambios() {
    if (this.password === '') {
      alert('No se ha ingresado una contraseña');
      return;
    }
    if (this.password === this.confirmPassword) {
      this.loading = true;

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

  desabilidarPerfil() {
    let confirmacion = this.switch.nativeElement.checked;
    if (this.Activo) {
      confirmacion = confirm('¿Está seguro de ocultar tu perfil?');
    } else {
      confirmacion = confirm('¿Está seguro de mostrar tu perfil?');
    }
    if (confirmacion) {
      const data = {
        Activo: !this.Activo,
      };
      this.userService
        .actualizarInformacionPrimariaDelUsuario(data, this.id)
        .subscribe((response: any) => {
          if (response) {
            alert('El perfil ha sido actualizado con exito!...');
            return (this.Activo = response.Activo);
          } else {
            alert('Ocurrio un error...');
          }
        });
    } else {
      window.location.reload();
    }
  }

  async getEgresado(): Promise<any> {
    try {
      this.loading = true;
      const response = await fetch(
        `https://egresados-uasd-server.onrender.com/v1/egresado/${this.id}`
      );
      const data = await response.json();
      this.loading = false;
      this.Activo = data.Activo;
    } catch (error) {
      console.error('Error fetching egresado:', error);
      throw error;
    }
  }
}

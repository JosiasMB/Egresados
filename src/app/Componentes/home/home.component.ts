import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Egresado } from 'src/app/Models/egresado.model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario: Egresado = {
    id: 0,
    PrimerNombre: '',
    SegundoNombre: '',
    Nivel: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Cedula: '',
    Pasaporte: '',
    FechaNac: '',
    Genero: '',
    profilePicUrl: '',
    about: '',
    destacado: false,
    descripcionDestacado: '',
    experienciaLaboralEgresado: [],
    mostrarPerfil: false,
    contacto: [],
    educacion: [],
    nacionalidadEgresado: [],
    idiomaEgresado: [],
    egresadosHabilidad: [],
    direccionEgresado: [],
    usuario: [],
    Activo: true,
  };
  loading: boolean = false;
  constructor(
    private userService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getUser(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (data: Egresado) => {
          this.usuario = data;
          if (this.usuario.usuario?.[0]?.roleId == 1) {
            this.router.navigateByUrl(
              `/admin/${this.usuario.usuario[0].roleId}`
            );
          }
        },
        (error) => {
          console.error('Error al cargar egresado', error);
        }
      );
    this.loading = false;
  }

  logOut() {
    const confirmLogout = confirm('¿Estás seguro de que quieres salir?');
    this.loading = true;
    if (confirmLogout) {
      this.userService.logOut();
    }
  }

  settings(id: number) {
    this.router.navigateByUrl(`/user-settings/${id}`);
  }
  editar(id: number) {
    this.router.navigateByUrl(`/usuario/${id}`);
  }
}

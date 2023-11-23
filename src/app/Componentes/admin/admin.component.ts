import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import { Egresado } from 'src/app/Models/egresado.model';
import { EgresadoListService } from 'src/app/Servicios/lista-egresados.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('search')
  input!: ElementRef;

  egresados: Egresado[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9999999;
  totalItems: number = 0;
  candidatos: Boolean = false;
  desabilitados: Boolean = false;
  listaDestacados: Boolean = false;
  inicio: Boolean = true;
  destacadoDescripcion = '';
  showLoading: boolean = false;
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

  constructor(
    private userService: UsuarioService,
    private egresadoService: EgresadoListService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup') // JO
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.loadEgresados(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadEgresados();

    this.userService
      .getUser(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (data: Egresado) => {
          this.usuario = data;
        },
        (error) => {
          console.error('Error al cargar egresado', error);
        }
      );
  }

  logOut() {
    this.userService.logOut();
  }

  loadEgresados(q: any = null) {
    this.listaDestacados = false;
    this.inicio = true;
    this.candidatos = false;
    this.desabilitados = false;
    this.egresadoService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage, q)
      .subscribe(
        (data: any) => {
          this.totalItems = data.headers.get('X-Total-Count');
          this.egresados = data.body;
        },
        (error) => {
          console.error('Error al cargar los egresados', error);
        }
      );
  }

  pageChanged($event: number) {
    this.currentPage = $event;

    this.loadEgresados();
  }

  settings(id: number) {
    this.router.navigateByUrl(`/user-settings/${id}`);
  }

  candidatosFunction() {
    this.inicio = false;
    this.candidatos = true;
    this.desabilitados = false;
    this.listaDestacados = false;
    let q = undefined;
    this.egresadoService.getCandidatos(this.currentPage, q).subscribe(
      (data: any) => {
        this.totalItems = data.headers.get('X-Total-Count');
        this.egresados = data.body;
      },
      (error) => {
        console.error('Error al cargar los egresados', error);
      }
    );
  }

  listaEgresadosDestacados() {
    this.inicio = false;
    this.listaDestacados = true;
    this.candidatos = false;
    this.desabilitados = false;
    let q = undefined;
    this.egresadoService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage, q)
      .subscribe(
        (data: any) => {
          this.totalItems = data.headers.get('X-Total-Count');
          this.egresados = data.body;
          this.egresados = this.egresados.filter(
            (egresado: any) => egresado.destacado === true
          );
        },
        (error) => {
          console.error('Error al cargar los egresados', error);
        }
      );
  }

  egresadosDestacados: { [key: number]: boolean } = {};

  ocultar(id: number) {
    this.egresadosDestacados[id] = !this.egresadosDestacados[id];
  }

  destacarEgresado(id: number) {
    this.egresadosDestacados[id] = true;

    if (this.destacadoDescripcion && this.destacadoDescripcion.trim() !== '') {
      const confirmacion = confirm('¿Está seguro de destacar este egresado?');
      if (confirmacion) {
        const data = {
          destacado: true,
          descripcionDestacado: this.destacadoDescripcion,
        };
        this.userService
          .actualizarInformacionPrimariaDelUsuario(data, id)
          .subscribe((response: any) => {
            if (response) {
              alert('El usuario ha sido actualizado correctamente!...');
              this.loadEgresados();
              this.egresadosDestacados[id] = false;
            } else {
              alert('Ocurrió un error...');
            }
          });
      }
    } else {
      alert('Debe ingresar una descripción para poder destacar al egresado!');
    }
  }

  noDestacar(id: number) {
    this.egresadosDestacados[id] = false;
    const confirmacion = confirm('¿Está seguro de no destacar este egresado?');

    if (confirmacion) {
      const data = {
        destacado: false,
      };
      this.userService
        .actualizarInformacionPrimariaDelUsuario(data, id)
        .subscribe((response: any) => {
          if (response) {
            alert('El usuario ha sido actualizado correctamente!...');
            this.loadEgresados();
          } else {
            alert('Ocurrio un error...');
          }
        });
    }
  }

  perfilesDeshabilitados() {
    this.inicio = false;
    this.desabilitados = true;
    this.listaDestacados = false;
    this.candidatos = false;
    let q = undefined;
    this.egresadoService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage, q)
      .subscribe(
        (data: any) => {
          this.egresados = data.body;
          this.egresados = this.egresados.filter(
            (egresado: any) => egresado.Activo === false
          );
        },
        (error) => {
          console.error('Error al cargar los egresados', error);
        }
      );
  }

  mostrarDeshabilitarPerfil(id: number) {
    const newEgresado = this.egresados.filter((egre: any) => egre.id == id);
    const confirmacion = confirm('¿Está seguro de continuar con la accion?');
    if (confirmacion) {
      const data = {
        Activo: !newEgresado[0].Activo,
      };
      this.userService
        .actualizarInformacionPrimariaDelUsuario(data, id)
        .subscribe((response: any) => {
          if (response) {
            alert('El usuario ha sido actualizado con exito!...');
            this.loadEgresados();
          } else {
            alert('Ocurrio un error...');
          }
        });
    }
  }

  obtenerUltimaPosicion(egresado: Egresado) {
    const { experienciaLaboralEgresado } = egresado;
    const ultimaPosicion = experienciaLaboralEgresado.filter(
      (experiencia) => !experiencia.FechaSal
    )[0];
    return ultimaPosicion ? ultimaPosicion.posicion : 'No tiene experiencia';
  }

  obtenerUltimaEmpresa(egresado: Egresado) {
    const { experienciaLaboralEgresado } = egresado;
    const ultimaEmpresa = experienciaLaboralEgresado.filter(
      (empresa) => empresa.empresa
    )[0];
    return ultimaEmpresa ? ultimaEmpresa.empresa : 'Empresa no registrada';
  }
}

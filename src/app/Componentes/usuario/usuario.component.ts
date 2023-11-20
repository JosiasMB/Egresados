import { Component, OnInit } from '@angular/core';
import { Egresado, IdiomaEgresado } from '../../Models/egresado.model';
import { UsuarioService } from '../../Servicios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HabilidadListService } from '../../Servicios/lista-habilidadades.service';
import { Habilidad } from 'src/app/Models/habilidades.model';
import { IdiomasListService } from 'src/app/Servicios/lista-idiomas.service';
import { ProvinciaListService } from 'src/app/Servicios/lista-provincias.services';
import { Provincia } from 'src/app/Models/provincias.model';
import { CarreraListService } from 'src/app/Servicios/lista-carreras.service';
import { Carrera } from 'src/app/Models/carreras.model';
import { of, switchMap } from 'rxjs';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
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
  provincias: Provincia[] = [];
  habilidades: Habilidad[] = [];
  carreras: Carrera[] = [];
  idiomasList: IdiomaEgresado[] = [];
  nombreDelPuesto: string = '';
  nombreEmpresa: string = '';

  filtroProvincia: string = '';
  filtroIdioma: string = '';
  filtroHabilidades: string = '';

  fechaEntr: string = '';
  fechaSal: any = null;
  Universidad: string = '';
  Titulo: string = '';
  TipoTitulo: string = '';

  constructor(
    private router: Router,
    private userService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private habilidadService: HabilidadListService,
    private idiomaService: IdiomasListService,
    private provinciaService: ProvinciaListService,
    private carreraService: CarreraListService
  ) {}

  ngOnInit() {
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
  }

  mostrarSlideMenu = false;
  mostrarContacto = false;
  mostrarHabilidad = false;
  mostrarIdioma = false;
  mostrarExperiencia = false;
  mostrarEducacion = false;
  mostrarDireccion = false;
  showLoading: boolean = false;
  mostrarModal(option: string) {
    switch (option) {
      case 'mostrarIdioma':
        if (!this.mostrarIdioma) {
          this.Idiomas();
        }
        this.mostrarIdioma = !this.mostrarIdioma;
        this.filtroIdioma = '';
        break;
      case 'mostrarHabilidad':
        if (!this.mostrarHabilidad) {
          this.Habilidades();
        }
        this.filtroHabilidades = '';
        this.mostrarHabilidad = !this.mostrarHabilidad;
        break;
      case 'mostrarExperiencia':
        this.mostrarExperiencia = !this.mostrarExperiencia;
        break;
      case 'mostrarEducacion':
        if (!this.mostrarEducacion) {
          this.Carreras();
        }
        this.mostrarEducacion = !this.mostrarEducacion;

        break;
      case 'mostrarContacto':
        this.mostrarContacto = !this.mostrarContacto;
        this.valor = '';
        this.opcionSeleccionada = '';
        break;
      case 'mostrarDireccion':
        if (!this.mostrarDireccion) {
          this.provinciasUsuario();
        }
        this.filtroProvincia = '';
        this.mostrarDireccion = !this.mostrarDireccion;
        break;
      case 'mostrarSlideMenu':
        this.mostrarSlideMenu = !this.mostrarSlideMenu;
        break;
    }
  }

  logOut() {
    this.userService.logOut();
  }

  agregarExperience() {
    const data = {
      egresadoId: this.usuario.id,
      posicion: this.nombreDelPuesto,
      empresa: this.nombreEmpresa,
      salario: null,
      FechaEntr: this.fechaEntr,
      FechaSal: this.fechaSal,
    };
    this.userService.agregarExperience(data).subscribe(
      (data: any) =>
        this.usuario.experienciaLaboralEgresado.push({
          posicion: data.posicion,
          egresadoId: data.egresadoId,
          empresa: data.empresa,
          salario: data.salario,
          FechaEntr: data.FechaEntr,
          FechaSal: data.FechaSal,
          id: data.id,
        }),
      (error) => {
        alert('Error al agregar');
        console.log(error);
      }
    );
    this.mostrarExperiencia = false;
  }
  deleteExperience(id: any) {
    this.userService.deleteExperience(id).subscribe(
      () => {
        this.usuario.experienciaLaboralEgresado =
          this.usuario.experienciaLaboralEgresado.filter(
            (experiencia) => experiencia.id != id
          );
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }
  fechaSalidad: boolean = false;
  fechaSalida() {
    this.fechaSalidad = !this.fechaSalidad;
  }
  Carreras() {
    this.carreraService.getCarreras().subscribe(
      (data) => {
        this.carreras = data.sort((a, b) =>
          a.NombreCarrera.localeCompare(b.NombreCarrera)
        );
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }
  agregarEducacion() {
    let newId = 0;
    for (let i = 0; i < this.carreras.length; i++) {
      if (this.carreras[i].NombreCarrera === this.Titulo) {
        newId = this.carreras[i].id;
      }
    }
    const data = {
      egresadoId: this.usuario.id,
      Universidad: this.Universidad,
      FechaEntr: this.fechaEntr,
      FechaSal: this.fechaSal,
      carreraId: newId,
      Titulo: this.Titulo,
      TipoTitulo: this.TipoTitulo,
    };

    this.userService.agregarEducacion(data).subscribe(
      (data: any) =>
        this.usuario.educacion.push({
          egresadoId: this.usuario.id,
          Universidad: this.Universidad,
          FechaEntr: this.fechaEntr,
          FechaSal: this.fechaSal,
          carreraId: newId,
          Titulo: this.Titulo,
          TipoTitulo: this.TipoTitulo,
          id: data.id,
        }),
      (error) => {
        alert('Error al agregar');
        console.log(error);
      }
    );
    this.mostrarEducacion = false;
  }

  deleteEducacion(id: any) {
    this.userService.deleteEducacion(id).subscribe(
      () => {
        this.usuario.educacion = this.usuario.educacion.filter(
          (educacion) => educacion.id != id
        );
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }

  // Manejador de tipo input contacto
  opcionSeleccionada = '';
  valor: any;

  getTipoEntrada() {
    return this.opcionSeleccionada === 'Email' ? 'email' : 'tel';
  }

  pattern() {
    if (this.getTipoEntrada() === 'email') {
      return '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';
    } else if (this.getTipoEntrada() === 'tel') {
      return '[0-9]{3}[0-9]{3}[0-9]{4}';
    }
    return '';
  }

  verificarValorEnTiempoReal() {
    if (this.getTipoEntrada() === 'email') {
      if (!this.validarEmail(this.valor)) {
        return '*** Correo electrónico no válido ***';
      }
    } else {
      if (!this.validarTelefono(this.valor)) {
        return '*** Número de teléfono no válido ***';
      }
    }
    return '';
  }

  validarEmail(valor: string): boolean {
    const emailPattern = new RegExp(this.pattern());
    return emailPattern.test(valor);
  }

  validarTelefono(valor: string): boolean {
    const telefonoPattern = new RegExp(this.pattern());
    return telefonoPattern.test(valor);
  }

  agregarContacto(egresadoId: number) {
    const data = {
      egresadoId,
      tipo: this.opcionSeleccionada,
      valor: this.valor,
    };

    this.userService.agregarContacto(data).subscribe((response: any) =>
      this.usuario.contacto.push({
        egresadoId,
        tipo: this.opcionSeleccionada,
        valor: this.valor,
        id: response.id,
      })
    );

    this.mostrarContacto = false;
  }

  deleteContacto(id: any) {
    this.userService.deleteContacto(id).subscribe(
      () => {
        this.usuario.contacto = this.usuario.contacto.filter(
          (contacto) => contacto.id != id
        );
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }

  Habilidades() {
    this.habilidadService.getHabilidades().subscribe(
      (data) => {
        this.habilidades = data.sort((a, b) =>
          a.habilidad.localeCompare(b.habilidad)
        );
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  deleteHabilidad(id: any) {
    this.userService.deleteHabilidades(id).subscribe(
      () => {
        this.usuario.egresadosHabilidad =
          this.usuario.egresadosHabilidad.filter(
            (habilidad) => habilidad.id != id
          );
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }

  agregarHabilidad(habilidad: string, habilidadId: number, egresadoId: number) {
    const data = { habilidad, habilidadId, egresadoId };
    this.userService.agregarHabilidad(data).subscribe((response: any) =>
      this.usuario.egresadosHabilidad.push({
        habilidad,
        habilidadId,
        egresadoId,
        id: response.id,
      })
    );
  }

  Idiomas() {
    this.idiomaService.getIdiomas().subscribe(
      (data: any) => {
        this.idiomasList = data.sort(
          (a: { idioma: string }, b: { idioma: any }) =>
            a.idioma.localeCompare(b.idioma)
        );
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  deleteIdioma(id: number) {
    this.userService.deleteIdioma(id).subscribe(
      () => {
        this.usuario.idiomaEgresado = this.usuario.idiomaEgresado.filter(
          (idioma) => idioma.id != id
        );
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }

  agregarIdioma(idioma: string, idiomaId: number, egresadoId: number) {
    const data = { idioma, idiomaId, egresadoId };
    this.userService.agregarIdioma(data).subscribe((response: any) =>
      this.usuario.idiomaEgresado.push({
        idioma,
        idiomaId,
        egresadoId,
        id: response.id,
      })
    );
  }

  provinciasUsuario() {
    this.provinciaService.getProvincias().subscribe(
      (data) => {
        this.provincias = data.sort((a, b) =>
          a.provincia.localeCompare(b.provincia)
        );
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  deleteDireccion(id: number) {
    this.userService.deleteDireccion(id).subscribe(
      () => {
        if (this.usuario.direccionEgresado.length > 0) {
          this.usuario.direccionEgresado =
            this.usuario.direccionEgresado.filter(
              (direccion) => direccion.id != id
            );
        }
      },
      (error) => {
        console.error('Error deleting resource', error);
      }
    );
  }

  agregarDireccion(provincia: string, provinciaId: number, egresadoId: number) {
    const data = { provincia, provinciaId, egresadoId };
    if (this.usuario.direccionEgresado.length > 0) {
      this.deleteDireccion(this.usuario.direccionEgresado[0].id);
    }
    this.userService.agregarDireccion(data).subscribe((response: any) =>
      this.usuario.direccionEgresado.push({
        provincia,
        provinciaId,
        egresadoId,
        id: response.id,
      })
    );

    this.mostrarDireccion = false;
  }

  imagen: any;
  genero: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  PrimerApellido: string = '';
  SegundoApellido: string = '';
  Cedula: string = '';
  Pasaporte: string = '';
  FechaNac: string = '';
  about: string = '';
  selectedImage: string = '';
  fileSeleted(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result as string;
      };
      reader.readAsDataURL(file);
      this.imagen = file;
    }
  }

  actualizarInformacionPrimariaDelUsuario(id: number) {
    this.showLoading = true;

    let uploadProfilePicObservable = of(null);

    if (this.imagen) {
      const formData = this.userService.getProfilePicFormData(
        this.imagen,
        this.usuario.id
      );

      uploadProfilePicObservable =
        this.userService.uploadEgresadoProfilePic(formData);
    }

    uploadProfilePicObservable
      .pipe(
        switchMap((data: any) => {
          if (data) {
            this.imagen = data.url;
          } else {
            this.imagen = this.usuario.profilePicUrl;
          }
          if (!this.genero) {
            this.genero = this.usuario.Genero;
          }
          if (!this.primerNombre) {
            this.primerNombre = this.usuario.PrimerNombre;
          }
          if (!this.PrimerApellido) {
            this.PrimerApellido = this.usuario.PrimerApellido;
          }
          if (!this.SegundoApellido) {
            this.SegundoApellido = this.usuario.SegundoApellido;
          }
          if (!this.FechaNac) {
            this.FechaNac = this.usuario.FechaNac;
          }
          if (!this.about) {
            this.about = this.usuario.about;
          }

          return of(null);
        })
      )
      .subscribe(() => {
        const data = {
          PrimerNombre: this.primerNombre,
          SegundoNombre: this.segundoNombre,
          PrimerApellido: this.PrimerApellido,
          SegundoApellido: this.SegundoApellido,
          Cedula: this.Cedula,
          Pasaporte: this.Pasaporte,
          FechaNac: this.FechaNac,
          Genero: this.genero,
          about: this.about,
          profilePicUrl: this.imagen,
        };

        this.userService
          .actualizarInformacionPrimariaDelUsuario(data, id)
          .subscribe((response: any) => {
            this.usuario.PrimerNombre = response.PrimerNombre;
            this.usuario.Genero = response.Genero;
            this.usuario.SegundoNombre = response.SegundoNombre;
            this.usuario.PrimerApellido = response.PrimerApellido;
            this.usuario.SegundoApellido = response.SegundoApellido;
            this.usuario.Cedula = response.Cedula;
            this.usuario.Pasaporte = response.Pasaporte;
            this.usuario.FechaNac = response.FechaNac;
            this.usuario.about = response.about;
            this.usuario.profilePicUrl = response.profilePicUrl;
            this.showLoading = false;
          });
      });
  }

  settings(id: number) {
    this.router.navigateByUrl(`/user-settings/${id}`);
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Egresado } from '../../Models/egresado.model';
import { EgresadoListService } from '../../Servicios/lista-egresados.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-targetas-usuarios',
  templateUrl: './targetas-usuarios.component.html',
  styleUrls: ['./targetas-usuarios.component.css'],
})
export class TargetasUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild('search')
  input!: ElementRef;
  egresados: Egresado[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  loading: boolean = false;

  constructor(private egresadoService: EgresadoListService) {}

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          this.loadEgresados(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadEgresados();
  }

  loadEgresados(q: any = null) {
    this.egresadoService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage, q)
      .subscribe(
        (data: any) => {
          this.totalItems = data.headers.get('X-Total-Count');
          this.egresados = data.body.map((egre: any) => ({
            ...egre,
            mostrarPerfil: false,
          }));
          this.egresados = this.egresados.filter(
            (egresado: any) => egresado.Activo === true
          );
        },
        (error) => {
          console.error('Error al cargar los egresados', error);
        }
      );
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
    return ultimaEmpresa ? ultimaEmpresa.empresa : 'N/A';
  }

  mostrarOcultarPerfil(egresado: Egresado) {
    egresado.mostrarPerfil = !egresado.mostrarPerfil;
  }

  pageChanged($event: number) {
    this.currentPage = $event;
    this.loadEgresados();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mostrarOcultarFiltros: Boolean = false;
  verFiltros() {
    this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
  }

  parentFiltrosFunction(data: any) {
    if (
      data.destacados == false &&
      data.rangoFechaInicio == '' &&
      data.rangoFechaFin == '' &&
      data.dateRangeDisabled == undefined &&
      data.habilidades.length == 0 &&
      data.provincias.length == 0 &&
      data.tituloTipos.length == 0
    ) {
      alert('Debe seleccionar al menos un filtro');
      return;
    }

    if (data == 'mostrar') {
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    } else if (data == 'limpiarFiltros') {
      this.loadEgresados();
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    } else {
      if (data.rangoFechaInicio == '' && data.rangoFechaFin == '') {
        data.dateRangeDisabled = true;
      }
      this.egresadoService
        .filterEgresados(data, this.currentPage)
        .subscribe((data) => {
          this.egresados = data;
        });
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    }
  }
}

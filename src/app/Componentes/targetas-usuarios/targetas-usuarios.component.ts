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

  constructor(private egresadoService: EgresadoListService) {}

  ngAfterViewInit(): void {
    console.log(this.input);
    fromEvent(this.input.nativeElement, 'keyup')
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
  }

  mostrarOcultarFiltros: Boolean = false;
  verFiltros() {
    this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
  }

  parentFiltrosFunction(data: any) {
    if (data == 'mostrar') {
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    } else if (data == 'limpiarFiltros') {
      this.loadEgresados();
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    } else {
      this.egresadoService
        .filterEgresados(data, this.currentPage)
        .subscribe((data) => {
          console.log(data);
          this.egresados = data;
        });
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    }
  }
}

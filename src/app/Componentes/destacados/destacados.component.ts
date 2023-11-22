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
  fromEvent,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent implements OnInit, AfterViewInit {
  @ViewChild('search')
  input!: ElementRef;

  destacados: Egresado[] = [];
  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1;

  constructor(private egresadoListService: EgresadoListService) {}
  ngOnInit(): void {
    this.loadEgresados();
  }

  ngAfterViewInit(): void {
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

  loadEgresados(q: any = null) {
    this.egresadoListService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage, q)
      .subscribe(
        (data: any) => {
          const newDes = data.body.filter((e: any) => e.destacado === true);
          this.destacados = newDes.map((des: any) => ({
            ...des,
            mostrarPerfil: false,
          }));
          this.destacados = this.destacados.filter(
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
      this.egresadoListService
        .filterEgresados(data, this.currentPage)
        .subscribe((data) => {
          this.destacados = data;
          console.log(this.destacados);
          this.destacados = this.destacados.filter(
            (destacado: any) =>
              destacado.destacado === true && destacado.Activo === true
          );
        });
      this.mostrarOcultarFiltros = !this.mostrarOcultarFiltros;
    }
  }
}

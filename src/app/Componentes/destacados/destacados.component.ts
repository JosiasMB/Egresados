import { Component, OnInit } from '@angular/core';
import { Egresado } from '../../Models/egresado.model';
import { EgresadoListService } from '../../Servicios/lista-egresados.service';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent implements OnInit {
  destacados: Egresado[] = [];
  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1;
  showLoading: boolean = false;

  constructor(private egresadoListService: EgresadoListService) {}
  ngOnInit(): void {
    this.showLoading = true;

    this.egresadoListService
      .getEgresadosPaginados(this.currentPage, this.itemsPerPage)
      .subscribe(
        (data) => {
          const newDes = data.body.filter((e: any) => e.destacado === true);
          this.destacados = newDes.map((des: any) => ({
            ...des,
            mostrarPerfil: false,
          }));
        },

        (error) => {
          console.error('Error al obtener egresados:', error);
        }
      );
    this.showLoading = false;
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
}

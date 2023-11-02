import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent {
  @Output() filtroFechas: EventEmitter<{
    fechaDesde: string;
    fechaHasta: string;
  }> = new EventEmitter();
  fechaDesde: string = '';
  fechaHasta: string = '';
  visible: boolean = false;
  filtroEgresadoPorFecha() {
    this.filtroFechas.emit({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
    });
  }
  mostrarMenu() {
    this.visible = !this.visible;
  }
}

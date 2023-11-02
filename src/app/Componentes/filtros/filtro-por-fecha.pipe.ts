import { Pipe, PipeTransform } from '@angular/core';
import { Egresado } from 'src/app/Models/egresado.model';

@Pipe({
  name: 'filtroPorFecha',
})
export class FiltroPorFechaPipe implements PipeTransform {
  transform(egresados: any[], fechaDesde: string, fechaHasta: string): any[] {
    if (!egresados) {
      return egresados;
    }

    if (!fechaDesde || !fechaHasta) {
      return egresados;
    }

    return egresados.filter((data) => {
      const fechaInicio = new Date(data.educacion[0].FechaEntr);
      const fechaGraduacion = new Date(data.educacion[0].FechaSal);
      const fechaDesdeDate = new Date(fechaDesde);
      const fechaHastaDate = new Date(fechaHasta);

      return fechaInicio >= fechaDesdeDate && fechaGraduacion <= fechaHastaDate;
    });
  }
}

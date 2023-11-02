import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroHabilidades',
})
export class FiltroHabilidades implements PipeTransform {
  transform(habilidad: any[], filtroHabilidades: string): any[] {
    if (!filtroHabilidades) {
      return habilidad;
    }

    filtroHabilidades = filtroHabilidades.toLowerCase();
    return habilidad.filter((habilidad) => {
      return habilidad.habilidad.toLowerCase().includes(filtroHabilidades);
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCarreras',
})
export class filtroCarreras implements PipeTransform {
  transform(carrera: any[], filtroCarreras: string): any[] {
    if (!filtroCarreras) {
      return carrera;
    }

    filtroCarreras = filtroCarreras.toLowerCase();
    return carrera.filter((carrera) => {
      const nombreCarrera = carrera.NombreCarrera.toLowerCase();
      const nombreCarreraSinAcento = nombreCarrera
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const filtroCarrerasSinAcento = filtroCarreras
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return nombreCarreraSinAcento.includes(filtroCarrerasSinAcento);
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroIdioma',
})
export class FiltroIdioma implements PipeTransform {
  transform(idioma: any[], filtroIdioma: string): any[] {
    if (!filtroIdioma) {
      return idioma;
    }

    filtroIdioma = filtroIdioma.toLowerCase();
    return idioma.filter((idioma) => {
      return idioma.idioma.toLowerCase().includes(filtroIdioma);
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProvincias',
})
export class FiltroProvincias implements PipeTransform {
  transform(provincia: any[], filtroProvincias: string): any[] {
    if (!filtroProvincias) {
      return provincia;
    }

    filtroProvincias = filtroProvincias.toLowerCase();
    return provincia.filter((provincia) => {
      return provincia.provincia.toLowerCase().includes(filtroProvincias);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Provincia } from '../../Models/provincias.model';
import { ProvinciaListService } from '../../Servicios/lista-provincias.services';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css'],
})
export class ProvinciasComponent implements OnInit {
  provincias: Provincia[] = [];
  constructor(private provinciaListService: ProvinciaListService) {}
  ngOnInit(): void {
    this.provinciaListService.getProvincias().subscribe(
      (data) => {
        this.provincias = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  selectedProvincia: string = '';
  showOptions: boolean = false;
  filteredProvincias = this.provincias;
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  filterOptions() {
    this.filteredProvincias = this.provincias.filter((provincia) =>
      provincia.provincia
        .toLowerCase()
        .includes(this.selectedProvincia.toLowerCase())
    );
  }

  selectOption(provincia: Provincia) {
    this.selectedProvincia = provincia.provincia;
    this.showOptions = false;
  }
}

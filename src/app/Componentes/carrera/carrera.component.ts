import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/Models/carreras.model';
import { CarreraListService } from 'src/app/Servicios/lista-carreras.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  constructor(private carreraListService: CarreraListService) {}
  ngOnInit(): void {
    this.carreraListService.getCarreras().subscribe(
      (data) => {
        this.carreras = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/Models/habilidades.model';
import { HabilidadListService } from 'src/app/Servicios/lista-habilidadades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  habilidades: Habilidad[] = [];
  constructor(private habilidadListService: HabilidadListService) {}
  ngOnInit(): void {
    this.habilidadListService.getHabilidades().subscribe(
      (data) => {
        this.habilidades = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }
}

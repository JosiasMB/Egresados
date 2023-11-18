import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'],
})
export class RecuperarPasswordComponent {
  correoEnviado: boolean = false;
  @ViewChild('search')
  input!: ElementRef;

  constructor(public router: Router, public userService: UsuarioService) {}

  recuperarPassword() {
    const inputValue = this.input.nativeElement.value;
    this.userService.recuperarPassword(inputValue).subscribe(
      (data) => {
        console.log(data);
        this.correoEnviado = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

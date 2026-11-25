import { Component } from '@angular/core';
import { CHAMADOS_FICTICIOS } from '../chamados-ficticios';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chamados-lista',
  templateUrl: './chamados-lista.html',
  styleUrl: './chamados-lista.css',
  imports: [RouterLink],
})
export class ChamadosLista {
  chamados = CHAMADOS_FICTICIOS;
}

import { Component } from '@angular/core';
import { CHAMADOS_FICTICIOS } from '../chamados-ficticios';

@Component({
  selector: 'app-chamados-lista',
  templateUrl: './chamados-lista.html',
  styleUrl: './chamados-lista.css',
})
export class ChamadosLista {
  chamados = CHAMADOS_FICTICIOS;
}

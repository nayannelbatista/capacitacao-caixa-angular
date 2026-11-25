import { Component } from '@angular/core';
import { Chamado } from '../chamado';
import { CHAMADOS_FICTICIOS } from '../chamados-ficticios';

@Component({
  selector: 'app-chamado-detalhe',
  templateUrl: './chamado-detalhe.html',
  styleUrl: './chamado-detalhe.css',
})
export class ChamadoDetalhe {
  chamado: Chamado | undefined = CHAMADOS_FICTICIOS[0];
}

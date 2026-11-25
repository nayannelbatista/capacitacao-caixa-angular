import { Component, inject } from '@angular/core';
import { Chamado } from '../chamado';
import { CHAMADOS_FICTICIOS } from '../chamados-ficticios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-detalhe',
  templateUrl: './chamado-detalhe.html',
  styleUrl: './chamado-detalhe.css',
})
export class ChamadoDetalhe {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  id = this.route.snapshot.paramMap.get('id');

  chamado = CHAMADOS_FICTICIOS.find(
    chamado => chamado.id === this.id
  )

  voltar() {
    this.router.navigate(['/chamados'])
  }
}

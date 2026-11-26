import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CHAMADOS_FICTICIOS } from '../chamados-ficticios';
import { RouterLink } from '@angular/router';
import { Chamado } from '../chamado';
import { ChamadosService } from '../chamados.service';

@Component({
  selector: 'app-chamados-lista',
  templateUrl: './chamados-lista.html',
  styleUrl: './chamados-lista.css',
  imports: [RouterLink],
})
export class ChamadosLista implements OnInit {
  //injecao de dependencias pelo construtor
  // chamados: readonly Chamado[];

  // constructor(private chamadosService: ChamadosService) {
  //   this.chamados = this.chamadosService.listarChamados();
  // }

  private chamadosService = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);

  chamados: Chamado[] = [];

  ngOnInit() {
    this.chamadosService.listarChamados().subscribe({
      next: (dados) => {
        this.chamados = dados;
        this.cdr.markForCheck();
      },
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {
        console.log('Concluído');
      },
    });
  }
}

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Chamado } from '../chamado';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChamadosService } from '../chamados.service';

@Component({
  selector: 'app-chamado-detalhe',
  templateUrl: './chamado-detalhe.html',
  imports: [RouterLink],
  styleUrl: './chamado-detalhe.css',
})
export class ChamadoDetalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private chamadosService = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);

  id = this.route.snapshot.paramMap.get('id');
  chamado: Chamado | undefined;
  carregando = Boolean(this.id);
  erroConsulta = '';
  excluindo = false;
  erroExclusao = '';

  ngOnInit(): void {
    if (this.id) {
      this.chamadosService.buscarPorId(this.id).subscribe({
        next: (dados) => {
          this.chamado = dados;
          this.carregando = false;
          this.cdr.markForCheck();
        },
        error: (erro) => {
          this.carregando = false;
          if (erro.status !== 404) {
            this.erroConsulta = 'Não foi possível consultar o chamado.';
          }
          this.cdr.markForCheck();
        },
      });
    }
  }

  excluir(): void {
    if (!this.chamado || this.excluindo) return;
    if (!window.confirm('Deseja excluir este chamado?')) return;

    this.excluindo = true;
    this.erroExclusao = '';
    this.chamadosService.excluirChamado(this.chamado.id).subscribe({
      next: () => this.voltar(),
      error: () => {
        this.excluindo = false;
        this.erroExclusao = 'Não foi possível excluir o chamado. Tente novamente.';
        this.cdr.markForCheck();
      },
    });
  }

  voltar() {
    this.router.navigate(['/chamados'])
  }
}

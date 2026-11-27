import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of, Subscription } from 'rxjs';
import { Chamado, STATUS_CHAMADO } from '../chamado';
import { ChamadosService } from '../chamados.service';

@Component({
  selector: 'app-chamados-lista',
  templateUrl: './chamados-lista.html',
  styleUrl: './chamados-lista.css',
  imports: [RouterLink, ReactiveFormsModule],
})
export class ChamadosLista implements OnInit, OnDestroy {
  private chamadosService = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);

  private assinaturaBusca?: Subscription;
  private assinaturaStatus?: Subscription;

  private consultaAtual?: Subscription;

  busca = new FormControl('', { nonNullable: true });
  filtroStatus = new FormControl('', { nonNullable: true });
  statusDisponiveis = STATUS_CHAMADO;

  chamados: Chamado[] = [];
  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.assinaturaBusca = this.busca.valueChanges.subscribe(() => this.consultar());
    this.assinaturaStatus = this.filtroStatus.valueChanges.subscribe(() => this.consultar());
    this.consultar();
  }

  ngOnDestroy(): void {
    this.assinaturaBusca?.unsubscribe();
    this.assinaturaStatus?.unsubscribe();
    this.consultaAtual?.unsubscribe();
  }

  private consultar(): void {
    this.consultaAtual?.unsubscribe();
    this.carregando = true;
    this.erro = '';

    this.consultaAtual = this.chamadosService
      .consultarChamados(this.busca.value, this.filtroStatus.value)
      .pipe(
        catchError(() => {
          this.erro = 'Não foi possível carregar os chamados.';
          return of([]);
        }),
        finalize(() => {
          console.log('Consulta finalizada')
          this.carregando = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (dados) => {
          this.chamados = dados;
        },
      });
  }
}

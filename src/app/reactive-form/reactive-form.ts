import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { STATUS_CHAMADO } from '../chamados/chamado';
import { ChamadosService } from '../chamados/chamados.service';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private chamadosService = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);

  id = this.route.snapshot.paramMap.get('id');
  carregando = Boolean(this.id);
  falhaAoCarregar = false;
  salvando = false;
  erro = '';
  statusDisponiveis = STATUS_CHAMADO;

  chamadoForm = this.formBuilder.nonNullable.group({
    titulo: ['', Validators.required],
    categoria: ['', Validators.required],
    status: ['Aberto', Validators.required],
    descricao: ['', Validators.required],
  });

  ngOnInit(): void {
    if (!this.id) return;

    this.chamadosService.buscarPorId(this.id).subscribe({
      next: (chamado) => {
        this.chamadoForm.patchValue(chamado);
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.carregando = false;
        this.falhaAoCarregar = true;
        this.erro = 'Não foi possível carregar o chamado.';
        this.cdr.markForCheck();
      },
    });
  }

  onSubmit(): void {
    if (this.chamadoForm.invalid || this.carregando || this.falhaAoCarregar || this.salvando) return;

    this.salvando = true;
    this.erro = '';
    const dados = this.chamadoForm.getRawValue();
    const requisicao = this.id
      ? this.chamadosService.atualizarChamado(this.id, dados)
      : this.chamadosService.cadastrarChamado(dados);

    requisicao.subscribe({
      next: (chamado) => {
        this.router.navigate(['/chamados', chamado.id]);
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível salvar o chamado. Tente novamente.';
        this.cdr.markForCheck();
      },
    });
  }
}

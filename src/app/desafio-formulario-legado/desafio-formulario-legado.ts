import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-desafio-formulario-legado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './desafio-formulario-legado.html',
  styleUrl: './desafio-formulario-legado.css',
})
export class DesafioFormularioLegado {
  chamadoForm: FormGroup;
  chamado = this.criarChamado();
  chamadoEnviado = false;

  constructor(private fb: FormBuilder) {
    this.chamadoForm = this.fb.nonNullable.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private criarChamado() {
    return {
      nome: '',
      departamento: '',
      prioridade: 'media',
      aceitaTermos: false,
    };
  }

  onSubmit(departamento: NgModel, prioridade: NgModel, aceitaTermos: NgModel): void {
    this.chamadoForm.markAllAsTouched();
    departamento.control.markAsTouched();
    prioridade.control.markAsTouched();
    aceitaTermos.control.markAsTouched();

    if (this.chamadoForm.invalid || departamento.invalid || prioridade.invalid || aceitaTermos.invalid) {
      return;
    }

    this.chamadoEnviado = true;
  }

  iniciarNovoChamado(): void {
    this.chamadoForm.reset({ nome: '', email: '', categoria: '', descricao: '' });
    this.chamado = this.criarChamado();
    this.chamadoEnviado = false;
  }
}

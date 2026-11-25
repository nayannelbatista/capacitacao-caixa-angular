import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
  chamado = {
    nome: '',
    email: '',
    departamento: '',
    categoria: '',
    prioridade: 'media',
    descricao: '',
    aceitaTermos: false
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    console.log(form.value)
  }

}

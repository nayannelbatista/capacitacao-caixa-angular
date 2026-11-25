import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {

  // FormControl
  // FormGroup
  // FormBuilder

  //abordagem 1
  // chamadoForm = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl(''),
    //   departamento: new FormControl(''),
    //   categoria: new FormControl(''),
    //   prioridade: new FormControl('media'),
    //   descricao: new FormControl(''),
    //   aceitaTermos: new FormControl(false),
    // });

    private formBuilder = inject(FormBuilder);

    chamadoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      departamento: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      prioridade: ['media', [Validators.required]],
      descricao: ['', [Validators.required]],
      aceitaTermos: [false, [Validators.requiredTrue]],
    })

    onSubmit() {
      console.log(this.chamadoForm.value)
    }
  }

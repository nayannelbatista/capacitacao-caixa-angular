import { Component } from '@angular/core';
import { ResumoChamado } from '../chamados/resumo-chamado';

@Component({
  selector: 'app-confirmacao-chamado',
  templateUrl: './confirmacao-chamado.html',
  styleUrl: './confirmacao-chamado.css',
})
export class ConfirmacaoChamado {
  chamado: ResumoChamado = {
    nome: 'Ana Silva',
    email: 'ana@example.com',
    departamento: 'Tecnologia',
    categoria: 'Acesso ao sistema',
    prioridade: 'media',
    descricao: 'Acesso ao portal interno.',
    aceitaTermos: true,
  };
}

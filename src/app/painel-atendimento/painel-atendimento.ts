import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Chamado = {
  id: number;
  nome: string;
  categoria: string;
  prioridade: string;
  status: string;
};

@Component({
  selector: 'app-painel-atendimento',
  imports: [FormsModule],
  templateUrl: './painel-atendimento.html',
  styleUrl: './painel-atendimento.css',
})
export class PainelAtendimento {

  titulo = 'Central de atendimento';
  nome = 'Nay';
  prioridade = 'media';
  categoriaSelecionada = '';
  categorias = ['Suporte técnico', 'Acesso ao sistema', 'Equipamentos'];
  chamados: Chamado[] = [];
  proximoId = 1;

  adicionarChamado() {
    if (!this.nome.trim() || !this.categoriaSelecionada) {
      return;
    }

    const novoChamado: Chamado = {
      id: this.proximoId++,
      nome: this.nome.trim(),
      categoria: this.categoriaSelecionada,
      prioridade: this.prioridade,
      status: 'aberto',
    };

    this.chamados.push(novoChamado);
  }

  limparChamados() {
    this.chamados = [];
  }
}

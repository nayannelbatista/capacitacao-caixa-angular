import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Aviso = {
  id: number;
  mensagem: string;
  tipo: string;
};

@Component({
  selector: 'app-avisos',
  imports: [FormsModule],
  templateUrl: './avisos.html',
  styleUrl: './avisos.css',
})
export class Avisos {
  titulo = 'Painel de avisos';
  mensagem = '';
  tipo = 'informacao';

  avisos: Aviso[] = [];
  proximoId = 1;

  publicarAviso() {
    if (!this.mensagem.trim()) {
      return;
    }

    const novoAviso: Aviso = {
      id: this.proximoId++,
      mensagem: this.mensagem.trim(),
      tipo: this.tipo,
    };

    this.avisos.push(novoAviso);
    this.mensagem = '';
  }
}

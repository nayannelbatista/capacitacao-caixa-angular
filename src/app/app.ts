import { Component } from '@angular/core';
import { PainelAtendimento } from './painel-atendimento/painel-atendimento';
import { Avisos } from './avisos/avisos';

@Component({
  selector: 'app-root',
  imports: [PainelAtendimento, Avisos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

import { Routes } from '@angular/router';
import { ChamadosLista } from './chamados/chamados-lista/chamados-lista';
import { ReactiveForm } from './reactive-form/reactive-form';
import { TemplateDrivenForm } from './template-driven-form/template-driven-form';
import { DesafioFormularioLegado } from './desafio-formulario-legado/desafio-formulario-legado';
import { PaginaNaoEncontrada } from './pagina-nao-encontrada/pagina-nao-encontrada';
import { ChamadoDetalhe } from './chamados/chamado-detalhe/chamado-detalhe';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chamados',
    pathMatch: 'full'
  },
  {
    path: 'chamados',
    component: ChamadosLista,
  },
  {
    path: 'formulario/reativo',
    component: ReactiveForm
  },
  {
    path: 'formulario/template-driven',
    component: TemplateDrivenForm
  },
  {
    path: 'desafio-legado',
    component: DesafioFormularioLegado
  },
  {
    path: 'chamados/:id',
    component: ChamadoDetalhe
  },
  {
    path: '**',
    component: PaginaNaoEncontrada
  },
];

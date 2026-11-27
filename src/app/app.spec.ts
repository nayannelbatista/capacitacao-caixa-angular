import { ChamadosLista } from './chamados/chamados-lista/chamados-lista';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { ReactiveForm } from './reactive-form/reactive-form';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the reactive form', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/formulario/reativo');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-reactive-form h1')?.textContent).toContain('Abertura de chamado');
  });


  it('cadastra, edita e exclui um chamado pelas rotas da aplicação', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const http = TestBed.inject(HttpTestingController);
    const url = 'http://localhost:3000/chamados';
    const dados = {
      titulo: 'Teste de atendimento',
      categoria: 'Software',
      descricao: 'Registro para verificar o fluxo.',
      status: 'Aberto',
    };
    const chamado = { ...dados, id: '104' };

    fixture.detectChanges();
    await router.navigateByUrl('/formulario/reativo');
    fixture.detectChanges();
    const cadastro: ReactiveForm = fixture.debugElement.query(By.directive(ReactiveForm)).componentInstance;
    cadastro.chamadoForm.patchValue(dados);
    cadastro.onSubmit();
    const post = http.expectOne({ url, method: 'POST' });
    expect(post.request.body).toEqual(dados);
    post.flush(chamado);
    await fixture.whenStable();

    http.expectOne({ url: url + '/104', method: 'GET' }).flush(chamado);
    fixture.detectChanges();
    const editar = fixture.nativeElement.querySelector('a[href="/chamados/104/editar"]');
    expect(editar).toBeTruthy();
    editar.click();
    await fixture.whenStable();

    http.expectOne({ url: url + '/104', method: 'GET' }).flush(chamado);
    fixture.detectChanges();
    const edicao: ReactiveForm = fixture.debugElement.query(By.directive(ReactiveForm)).componentInstance;
    expect(edicao.chamadoForm.getRawValue()).toEqual(dados);
    edicao.chamadoForm.controls.status.setValue('Concluído');
    edicao.onSubmit();
    const patch = http.expectOne({ url: url + '/104', method: 'PATCH' });
    expect(patch.request.body).toEqual({ ...dados, status: 'Concluído' });
    const atualizado = { ...chamado, status: 'Concluído' };
    patch.flush(atualizado);
    await fixture.whenStable();

    http.expectOne({ url: url + '/104', method: 'GET' }).flush(atualizado);
    fixture.detectChanges();
    const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(true);
    try {
      const excluir = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
        .find(botao => botao.textContent === 'Excluir chamado');
      expect(excluir).toBeTruthy();
      excluir?.click();
      expect(confirmar).toHaveBeenCalled();
      http.expectOne({ url: url + '/104', method: 'DELETE' }).flush(atualizado);
      await fixture.whenStable();
    } finally {
      confirmar.mockRestore();
    }

    expect(router.url).toBe('/chamados');
    http.expectOne({ url, method: 'GET' }).flush([]);
    http.verify();
  });


  it('consulta os filtros atuais e encerra as assinaturas ao sair da lista', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const http = TestBed.inject(HttpTestingController);
    const url = 'http://localhost:3000/chamados';

    fixture.detectChanges();
    await router.navigateByUrl('/');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe('Central de Atendimento');
    expect(Array.from(fixture.nativeElement.querySelectorAll('nav a') as NodeListOf<HTMLAnchorElement>)
      .map(link => link.textContent?.trim())).toEqual(['Início', 'Chamados', 'Abrir chamado', 'FAQ']);

    await router.navigateByUrl('/chamados');
    fixture.detectChanges();
    http.expectOne(url).flush([]);
    const lista: ChamadosLista = fixture.debugElement.query(By.directive(ChamadosLista)).componentInstance;
    const busca: HTMLInputElement = fixture.nativeElement.querySelector('#busca');
    const status: HTMLSelectElement = fixture.nativeElement.querySelector('#filtro-status');

    busca.value = 'monitor';
    busca.dispatchEvent(new Event('input'));
    const consultaAnterior = http.expectOne(req => req.params.get('titulo:contains') === 'monitor');

    status.value = 'Aberto';
    status.dispatchEvent(new Event('change'));
    expect(consultaAnterior.cancelled).toBe(true);
    http.expectOne(req =>
      req.params.get('titulo:contains') === 'monitor' && req.params.get('status') === 'Aberto',
    ).flush([{
      id: '102',
      titulo: 'Monitor sem imagem',
      categoria: 'Equipamento',
      status: 'Aberto',
      descricao: 'O monitor não mostra imagem.',
    }]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('article h2')?.textContent).toBe('Monitor sem imagem');

    busca.value = '';
    busca.dispatchEvent(new Event('input'));
    http.expectOne(req => !req.params.has('titulo:contains') && req.params.get('status') === 'Aberto')
      .flush([]);

    status.value = '';
    status.dispatchEvent(new Event('change'));
    http.expectOne(req => req.url === url && req.params.keys().length === 0).flush([]);

    lista.busca.setValue('rede');
    const consultaPendente = http.expectOne(req => req.params.get('titulo:contains') === 'rede');
    await router.navigateByUrl('/faq');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe('Perguntas frequentes');
    expect(consultaPendente.cancelled).toBe(true);

    lista.busca.setValue('acesso');
    lista.filtroStatus.setValue('Concluído');
    http.verify();
  });
});

import { inject, Injectable } from '@angular/core';
import { Chamado } from './chamado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/chamados';

  listarChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  cadastrarChamado(dados: Omit<Chamado, 'id'>): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, dados);
  }

  atualizarChamado(id: string, dados: Omit<Chamado, 'id'>): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/${id}`, dados);
  }

  excluirChamado(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrl}/${id}`);
  }

  // consultarChamados(titulo: string, status: string): Observable<Chamado[]> {
  //   return this.http.get<Chamado[]>(
  //     `${this.apiUrl}?titulo:contains=${titulo}&status=${status}`
  //   );
  // }

  consultarChamados(titulo: string, status: string): Observable<Chamado[]> {
    let params = new HttpParams();

    if (titulo.trim()) {
      params = params.set('titulo:contains', titulo.trim());
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Chamado[]>(this.apiUrl, { params });
  }
}

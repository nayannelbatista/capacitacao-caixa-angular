import { inject, Injectable } from '@angular/core';
import { Chamado } from './chamado';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { count, map, Observable, retry, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/chamados';

  listarChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  obterTotalChamados(): Observable<number> {
    return this.listarChamados().pipe(
      tap((chamados) => console.log('Antes do map:', chamados)),
      map(chamados => chamados.length),
      tap((total) => console.log('Depois do map:', total))
    )
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

  excluirChamado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  consultarChamados(titulo: string, status: string): Observable<Chamado[]> {
    let params = new HttpParams();

    if (titulo.trim()) {
      params = params.set('titulo:contains', titulo.trim());
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Chamado[]>(this.apiUrl, { params }).pipe(
      retry({
        count: 2,
        delay: (erro: HttpErrorResponse) => {
          if(erro.status === 0 || erro.status === 503) {
            return timer(5000);
          }
          return throwError(() => erro)
        }
      })
    );
  }
}

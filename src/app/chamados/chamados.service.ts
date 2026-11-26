import { inject, Injectable } from '@angular/core';
import { CHAMADOS_FICTICIOS } from './chamados-ficticios';
import { Chamado } from './chamado';
import { HttpClient } from '@angular/common/http';
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


  buscarPorId(id: string | null): Chamado | undefined {
    return CHAMADOS_FICTICIOS.find(
      chamado => chamado.id === id
    );
  }
}

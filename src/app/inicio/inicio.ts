import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChamadosService } from '../chamados/chamados.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  private chamadosService = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);

  totalChamados = 0;

  ngOnInit(): void {
    this.chamadosService.obterTotalChamados().subscribe((total) => {
      this.totalChamados = total;
      this.cdr.markForCheck();
    });
  }
}

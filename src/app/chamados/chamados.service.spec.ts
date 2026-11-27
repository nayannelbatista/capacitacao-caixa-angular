import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ChamadosService } from './chamados.service';

describe('ChamadosService', () => {
  let service: ChamadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChamadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

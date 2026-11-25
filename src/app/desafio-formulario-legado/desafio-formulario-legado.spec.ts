import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesafioFormularioLegado } from './desafio-formulario-legado';

describe('DesafioFormularioLegado', () => {
  let component: DesafioFormularioLegado;
  let fixture: ComponentFixture<DesafioFormularioLegado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesafioFormularioLegado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesafioFormularioLegado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

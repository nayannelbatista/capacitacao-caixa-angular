import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAtendimento } from './painel-atendimento';

describe('PainelAtendimento', () => {
  let component: PainelAtendimento;
  let fixture: ComponentFixture<PainelAtendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelAtendimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelAtendimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

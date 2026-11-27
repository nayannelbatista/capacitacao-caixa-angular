import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveForm } from './reactive-form';

describe('ReactiveForm', () => {
  let component: ReactiveForm;
  let fixture: ComponentFixture<ReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveForm],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

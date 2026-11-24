import { Component } from '@angular/core';
import { TemplateDrivenForm } from './template-driven-form/template-driven-form';

@Component({
  selector: 'app-root',
  imports: [TemplateDrivenForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

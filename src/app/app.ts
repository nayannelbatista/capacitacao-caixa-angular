import { Component } from '@angular/core';
import { ReactiveForm } from './reactive-form/reactive-form';

@Component({
  selector: 'app-root',
  imports: [ReactiveForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

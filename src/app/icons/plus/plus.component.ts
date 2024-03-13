import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus',
  standalone: true,
  imports: [],
  templateUrl: './plus.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class PlusComponent {
  @Input() size = 24
}

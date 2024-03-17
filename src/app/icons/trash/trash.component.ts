import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class TrashComponent {
  @Input() size = 24
}

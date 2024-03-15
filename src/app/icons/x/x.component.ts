import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-x',
  standalone: true,
  imports: [],
  templateUrl: './x.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class XComponent {
  @Input() size = 24
}

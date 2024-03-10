import { Component, Input } from '@angular/core'

@Component({
  selector: 'link-icon',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class LinkComponent {
  @Input() size = 24
}

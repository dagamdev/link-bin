import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class EditComponent {
  @Input() size = 24
}

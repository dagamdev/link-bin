import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-sidebar-expand',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-expand.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class SidebarExpandComponent {
  @Input() size = 24
}

import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-sidebar-collapse',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-collapse.component.html',
  styles: `
    :host {
      display: flex;
    }
  `
})
export class SidebarCollapseComponent {
  @Input() size = 24
}

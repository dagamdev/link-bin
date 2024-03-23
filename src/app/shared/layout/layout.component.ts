import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { HeaderNavComponent } from '../header-nav/header-nav.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
}

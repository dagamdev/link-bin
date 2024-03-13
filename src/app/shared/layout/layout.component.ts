import { LinkComponent } from '@/icons/link/link.component'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, LinkComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
}

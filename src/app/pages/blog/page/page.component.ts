import { Component } from '@angular/core'
import { HeaderNavComponent } from '@/shared/header-nav/header-nav.component'

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [HeaderNavComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}

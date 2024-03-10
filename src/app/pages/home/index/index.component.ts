import { Component } from '@angular/core'
import { LayoutComponent } from '@/shared/layout/layout.component'
import { LinkComponent } from '@/icons/link/link.component'

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LayoutComponent, LinkComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}

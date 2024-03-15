import { Component, signal } from '@angular/core'
import { LayoutComponent } from '@/shared/layout/layout.component'
import { LinkComponent } from '@/icons/link/link.component'
import { LinkService } from '@/core/services/link.service'
import type { Link } from '@/core/models/link'
import { LinkListComponent } from '@/shared/link-list/link-list.component'

@Component({
  selector: 'app-all-links',
  standalone: true,
  imports: [LayoutComponent, LinkComponent, LinkListComponent],
  templateUrl: './all-links.component.html',
  styleUrl: './all-links.component.css'
})
export class AllLinksComponent {
  links = signal<Link[]>([])

  constructor (private linkService: LinkService) {
    linkService.links.subscribe(this.links.set)
  }
}

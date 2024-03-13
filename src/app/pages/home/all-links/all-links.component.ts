import { Component, signal } from '@angular/core'
import { LayoutComponent } from '@/shared/layout/layout.component'
import { LinkComponent } from '@/icons/link/link.component'
import { LinkService } from '@/core/services/link.service'
import type { Link } from '@/core/models/link'
import { LinkCardComponent } from '@/shared/link-card/link-card.component'

@Component({
  selector: 'app-all-links',
  standalone: true,
  imports: [LayoutComponent, LinkComponent, LinkCardComponent],
  templateUrl: './all-links.component.html',
  styleUrl: './all-links.component.css'
})
export class AllLinksComponent {
  links = signal<Link[]>([])

  constructor (private linkService: LinkService) {
    linkService.links.subscribe(v => {
      this.links.set(v)
      console.log(v)
    })
  }

  createLink() {
    const newLink = this.linkService.createLink({
      binId: '113',
      name: 'Link name',
      url: 'https://www.youtube.com/watch?v=zUYQLUSrWeI'
    })

    console.log(newLink)
  }
}

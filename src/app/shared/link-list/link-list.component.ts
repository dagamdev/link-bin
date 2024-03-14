import { Component, Input } from '@angular/core'
import { LinkCardComponent } from '../link-card/link-card.component'
import type { Link } from '@/core/models/link'

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [LinkCardComponent],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.css'
})
export class LinkListComponent {
  @Input({required: true}) links: Link[] = []
}

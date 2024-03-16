import { Component, Input, signal } from '@angular/core'
import { LinkCardComponent } from '../link-card/link-card.component'
import type { Link } from '@/core/models/link'
import { ModalService } from '@/core/services/modal.service'
import { PlusComponent } from '@/icons/plus/plus.component'

@Component({
  selector: 'app-link-list',
  standalone: true,
  imports: [LinkCardComponent, PlusComponent],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.css'
})
export class LinkListComponent {
  @Input({required: true}) links = signal<Link[]>([])

  constructor (private modalService: ModalService) {}

  loadModal () {
    this.modalService.loadModal()
  }

  createLink () {
    this.modalService.openModal({
      type: 'create',
      target: 'link'
    })
  }
}

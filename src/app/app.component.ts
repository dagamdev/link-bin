import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LinkComponent } from './icons/link/link.component'
import { ModalComponent } from './modal/modal.component'
import { ModalService } from './core/services/modal.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinkComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadModal = signal(false)

  constructor (private modalService: ModalService) {
    modalService.load$.subscribe(this.loadModal.set)
  }
}

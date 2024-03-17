import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LinkComponent } from './icons/link/link.component'
import { ModalComponent } from './modal/modal.component'
import { ModalService } from './core/services/modal.service'
import { TooltipService } from './core/services/tooltip.service'
import type { Tooltip } from './core/models/tooltip'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinkComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadModal = signal(false)
  tooltip = signal<Tooltip | undefined>(undefined)

  constructor (private modalService: ModalService, private tooltipService: TooltipService) {
    modalService.load$.subscribe(this.loadModal.set)
    tooltipService.data$.subscribe(this.tooltip.set)
  }
}

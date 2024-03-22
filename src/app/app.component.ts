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
  tooltip?: Tooltip
  position = signal({
    top: '0px',
    left: '0px'
  })
  arrowPosition = signal(3)
  handleClick

  constructor (public modalService: ModalService, public tooltipService: TooltipService) {
    modalService.load$.subscribe(this.loadModal.set)
    tooltipService.data$.subscribe(tooltipData => {
      this.tooltip = tooltipData
      if (tooltipData) this.position.set({
        top: tooltipData.y + 'px',
        left: tooltipData.x + 'px'
      })

      if (typeof document !== 'undefined' && tooltipData) {
        const tooltip = document.getElementById('tooltip')
        if (!tooltip) return
        const { top, left } = this.position()
        let y = parseInt(top)
        let x = parseInt(left)
        const margin = 16

        if (tooltipData.direction === 'right') {
          if (x + tooltip.clientWidth > window.innerWidth - margin) {
            x -= tooltip.clientWidth

            this.position.set({
              top: y + 'px',
              left: x + 'px'
            })
          }
        }
      }
    })

    this.handleClick = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement) {
        const tooltip = document.getElementById('tooltip')

        if (!tooltip) return
        if (!tooltip.contains(ev.target)) {
          this.tooltipService.close()
        }
      }
    }

    if (typeof MutationObserver === 'undefined') return

    const mutationObserver = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type !== 'childList') continue
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLDivElement && node.id === 'tooltip') {
            if (!this.tooltip) return
            
            let { y, x } = this.tooltip
            const margin = 16
            
            const { target } = this.tooltip
            
            switch (this.tooltip.direction) {
              case 'top': {
                if (target) {
                  x += target.width / 2
                  y -= margin
                  this.arrowPosition.set(node.offsetWidth / 2)
                }

                break
              }
            
              case 'right': {
                if (target) {
                  x += target.width + margin
                  y += target.height / 2
                  this.arrowPosition.set(node.clientHeight / 2)
                }

                break
              }
        
              case 'bottom': {
                if (target) {
                  x += target.width / 2
                  y += target.height + margin
                  this.arrowPosition.set(node.clientWidth / 2)
                }


                break
              }
        
              case 'left': {
                if (target) {
                  x -= margin
                  y += target.height / 2
                  this.arrowPosition.set(node.clientHeight / 2)
                }

                break
              }
            }

            this.position.set({
              top: y + 'px',
              left: x + 'px'
            })
          }
        })
      }
    })
    
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleClick)
    }
  }

  ngOnDestroy () {
    if (typeof document === 'undefined') return
    document.removeEventListener('click', this.handleClick)
  }
}

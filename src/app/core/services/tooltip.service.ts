import { Injectable } from '@angular/core'
import type { Tooltip } from '../models/tooltip'
import { BehaviorSubject } from 'rxjs'
import { ModalService } from './modal.service'
import { BinService } from './bin.service'
import { LinkService } from './link.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  data = new BehaviorSubject<Tooltip | undefined>(undefined)
  data$ = this.data.asObservable()

  constructor(
    private modalService: ModalService,
    private binService: BinService,
    private linkService: LinkService,
    private router: Router
  ) { }

  onMouseEnter ({currentTarget}: MouseEvent) {
    if (!(currentTarget instanceof HTMLElement)) return    
    if (window.innerWidth >= 1000) return

    const { direction = 'top', content }: {
      content?: Tooltip['content']
      direction?: Tooltip['direction']
    } = currentTarget.dataset

    this.data.next({
      x: currentTarget.offsetLeft,
      y: currentTarget.offsetTop,
      type: 'normal',
      content,
      direction
    })
  }

  onMouseLeave () {
    if (this.data.value?.type === 'normal') {
      this.data.next(undefined)
    }
  }

  optionUpdate () { this.close() }
  optionDelete () { this.close() }

  onContextMenu (event: MouseEvent) {
    event.preventDefault()
    const currentTarget = event.currentTarget
    if (!(currentTarget instanceof HTMLElement)) return

    const { type = 'normal', id }: {
      id?: string
      type?: Tooltip['type']
      content?: Tooltip['content']
    } = currentTarget.dataset
    if (!id) return

    this.data.next({
      x: event.clientX,
      y: event.clientY,
      type,
      direction: 'right'
    })

    if (type === 'normal') return

    this.optionUpdate = () => {
      this.close()

      if (type === 'bin') {
        const bin = this.binService.getById(id)

        this.modalService.openModal({
          target: type,
          type: 'update',
          defaultData: {
            name: bin?.name,
            emoji: bin?.emoji,
            color: bin?.color,
            description: bin?.description,
          },
          updateElementId: id
        })
      } else {
        const link = this.linkService.getById(id)
        
        this.modalService.openModal({
          target: type,
          type: 'update',
          defaultData: {
            url: link?.url,
            name: link?.name,
            binId: link?.binId,
            description: link?.description,
          },
          updateElementId: id
        })
      }
    }

    this.optionDelete = () => {
      this.close()

      console.log('Delete', type)

      const confirmAction = () => {
        if (type === 'bin') {
          this.binService.delete(id)
        } else {
          this.linkService.delete(id)
        }

        if (this.router.url !== '/') {
          this.router.navigateByUrl('/')
        }
      } 

      this.modalService.openModal({
        type: 'confirm',
        target: 'bin',
        confirmText: type === 'bin'
          ? 'El contenedor será eliminado junto con todos sus enlaces relacionados.'
          : 'El enlace será eliminado.',
        confirmAction,
      })
    }
  }

  close () {
    this.data.next(undefined)
  }
}

import { Component, signal } from '@angular/core'
import { LinkComponent } from '@/icons/link/link.component'
import { BinService } from '@/core/services/bin.service'
import { RouterLink, RouterLinkActive } from '@angular/router'
import type { Bin } from '@/core/models/bin'
import { SidebarExpandComponent } from '@/icons/sidebar-expand/sidebar-expand.component'
import { SidebarCollapseComponent } from '@/icons/sidebar-collapse/sidebar-collapse.component'
import { CommonModule } from '@angular/common'
import { PlusComponent } from '@/icons/plus/plus.component'
import { ModalService } from '@/core/services/modal.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    SidebarExpandComponent, SidebarCollapseComponent,
    LinkComponent, PlusComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  bins = signal<Bin[]>([])
  
  constructor (private binService: BinService, private modalService: ModalService) {
    binService.bins.subscribe(this.bins.set)
  }

  loadModal () {
    this.modalService.loadModal()
  }

  createBin () {
    this.modalService.openModal({
      type: 'create',
      target: 'bin'
    })
  }
}

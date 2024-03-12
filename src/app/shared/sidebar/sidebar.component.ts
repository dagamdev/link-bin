import { Component, signal } from '@angular/core'
import { LinkComponent } from '@/icons/link/link.component'
import { BinService } from '@/core/services/bin.service'
import { RouterLink } from '@angular/router'
import type { Bin } from '@/core/models/bin'
import { SidebarExpandComponent } from '@/icons/sidebar-expand/sidebar-expand.component'
import { SidebarCollapseComponent } from '@/icons/sidebar-collapse/sidebar-collapse.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarExpandComponent, SidebarCollapseComponent, LinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  bins = signal<Bin[]>([])
  sidebarExpand = signal(false)

  constructor (private binService: BinService) {
    this.bins.set(binService.get())
  }

  toggleExpandSidebar () {
    this.sidebarExpand.update(v => !v)
  }
}

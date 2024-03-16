import { Component, Input, effect, signal } from '@angular/core'
import { LayoutComponent } from '@/shared/layout/layout.component'
import { BinService } from '@/core/services/bin.service'
import { LinkService } from '@/core/services/link.service'
import type { Bin } from '@/core/models/bin'
import type { Link } from '@/core/models/link'
import { LinkListComponent } from '@/shared/link-list/link-list.component'

@Component({
  selector: 'app-bin',
  standalone: true,
  imports: [LayoutComponent, LinkListComponent],
  templateUrl: './bin.component.html',
  styleUrl: './bin.component.css'
})
export class BinComponent {
  binId!: string
  bin = signal<Bin | undefined>(undefined)
  links = signal<Link[]>([])

  @Input()
  set id (binId: string) {
    this.binId = binId
    this.bin.set(this.binService.getById(binId))
    this.linkService.links$.subscribe(links => {
      this.links.set(links.filter(l => l.binId === binId))
    })
  }
  
  constructor (private binService: BinService,  private linkService: LinkService) {
    effect(() => {
      console.log('effect', this.bin())
    })
  }
}

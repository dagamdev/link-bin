import { Component, Input } from '@angular/core'
import { environment } from 'src/environments/environment'
import { BinService } from '@/core/services/bin.service'
import type { Link } from '@/core/models/link'
import type { Bin } from '@/core/models/bin'

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.css'
})
export class LinkCardComponent {
  baseIconUrl = environment.apiUrl + 'web/icon?url='
  linkData!: Link
  bin?: Bin

  @Input({ required: true })
  set link (link: Link) {
    if (link.binId) this.bin = this.binService.getById(link.binId)
    this.linkData = link
  }
  get link () {
    return this.linkData
  }

  constructor (private binService: BinService) { }
}

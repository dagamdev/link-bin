import { Component, Input } from '@angular/core'
import { environment } from 'src/environments/environment'
import type { Link } from '@/core/models/link'

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.css'
})
export class LinkCardComponent {
  baseIconUrl = environment.apiUrl + 'web/icon?url='
  @Input({ required: true }) link!: Link
}

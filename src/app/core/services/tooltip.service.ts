import { Injectable } from '@angular/core'
import type { Tooltip } from '../models/tooltip'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  data = new BehaviorSubject<Tooltip | undefined>(undefined)
  data$ = this.data.asObservable()

  constructor() { }

  onMouseEnter (event: MouseEvent) {

  }

  onMouseDown () {

  }

  onContextMenu (event: MouseEvent) {

  }
}

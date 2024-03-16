import { Injectable } from '@angular/core'
import type { Link } from '../models/link'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private links = new BehaviorSubject<Link[]>([])
  links$ = this.links.asObservable()

  constructor() { }
  
  create (linkData: Omit<Link, 'id'>) {
    const newLink: Link = {
      id: crypto.randomUUID(),
      ...linkData
    }

    this.links.next([...this.links.value, newLink])

    return newLink
  }
}

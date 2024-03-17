import { Injectable } from '@angular/core'
import type { Link } from '../models/link'
import { BehaviorSubject } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private links = new BehaviorSubject<Link[]>([])
  links$ = this.links.asObservable()

  constructor(private localStorageService: LocalStorageService) {
    this.links.next(localStorageService.get('links') ?? [])
  }
  
  create (linkData: Omit<Link, 'id'>) {
    const newLink: Link = {
      id: crypto.randomUUID(),
      ...linkData
    }
    const updatedData = [...this.links.value, newLink]

    this.links.next(updatedData)
    this.localStorageService.update('links', updatedData)

    return newLink
  }

  delete (linkId: string) {
    const existLink = this.links.value.some(l=> l.id === linkId)

    if (!existLink) return

    const updatedData = this.links.value.filter(l => l.id !== linkId)

    this.links.next(updatedData)
    this.localStorageService.update('links', updatedData)
  }
}

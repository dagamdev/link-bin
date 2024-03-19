import { Injectable } from '@angular/core'
import type { Link } from '../models/link'
import { BehaviorSubject } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  links = new BehaviorSubject<Link[]>([])
  links$ = this.links.asObservable()

  constructor(private localStorageService: LocalStorageService) {
    this.links.next(localStorageService.get('links') ?? [])
  }

  getById (linkId: string) {
    return this.links.value.find(l => l.id === linkId)
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

  update (linkId: string, updatedData: Partial<Omit<Link, 'id'>>) {
    const linkList = this.links.value.slice()
    const binIndex = linkList.findIndex(l => l.id === linkId)

    if (binIndex < 0) return

    const bin = linkList[binIndex]
    linkList[binIndex] = {...bin, ...updatedData}

    this.links.next(linkList)
    this.localStorageService.update('bins', linkList)
  }

  delete (linkId: string) {
    const updatedData = this.links.value.filter(l => l.id !== linkId)

    this.links.next(updatedData)
    this.localStorageService.update('links', updatedData)
  }
}

import { Injectable } from '@angular/core'
import { type Bin } from '../models/bin'
import { BehaviorSubject } from 'rxjs'
import { LocalStorageService } from './local-storage.service'
import { LinkService } from './link.service'

@Injectable({
  providedIn: 'root'
})
export class BinService {
  bins = new BehaviorSubject<Bin[]>([])
  bins$ = this.bins.asObservable()

  constructor (
    private localStorageService: LocalStorageService, 
    private linkService: LinkService
  ) {
    this.bins.next(localStorageService.get('bins') ?? [])
  }

  getById (binId: string) {
    return this.bins.value.find(b => b.id === binId)
  }

  create (newBinData: Omit<Bin, 'id'>) {
    const newBin = {
      id: crypto.randomUUID(),
      ...newBinData
    }
    const updatedData = [...this.bins.value, newBin]
    
    this.bins.next(updatedData)
    this.localStorageService.update('bins', updatedData)

    return newBin
  }

  delete (binId: string) {
    const updatedData = this.bins.value.filter(b => b.id !== binId)
    const linkUpdatedData = this.linkService.links.value.filter(l => l.binId !== binId)

    this.bins.next(updatedData)
    this.linkService.links.next(linkUpdatedData)
    this.localStorageService.update('bins', updatedData)
    this.localStorageService.update('links', linkUpdatedData)
  }
}

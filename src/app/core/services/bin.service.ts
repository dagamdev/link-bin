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
    const updatedBins = [...this.bins.value, newBin]
    
    this.bins.next(updatedBins)
    this.localStorageService.update('bins', updatedBins)

    return newBin
  }

  update (binId: string, updatedData: Partial<Omit<Bin, 'id'>>) {
    const binList = this.bins.value.slice()
    const binIndex = binList.findIndex(b => b.id === binId)

    if (binIndex < 0) return

    const bin = binList[binIndex]
    binList[binIndex] = {...bin, ...updatedData}

    this.bins.next(binList)
    this.localStorageService.update('bins', binList)
  }

  delete (binId: string) {
    const updatedBins = this.bins.value.filter(b => b.id !== binId)
    const updatedLinks= this.linkService.links.value.filter(l => l.binId !== binId)

    this.bins.next(updatedBins)
    this.linkService.links.next(updatedLinks)
    this.localStorageService.update('bins', updatedBins)
    this.localStorageService.update('links', updatedLinks)
  }
}

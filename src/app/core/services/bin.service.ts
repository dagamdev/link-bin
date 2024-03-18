import { Injectable } from '@angular/core'
import { type Bin } from '../models/bin'
import { BehaviorSubject } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class BinService {
  bins = new BehaviorSubject<Bin[]>([])
  bins$ = this.bins.asObservable()

  constructor (private localStorageService: LocalStorageService) {
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

    this.bins.next(updatedData)
    this.localStorageService.update('bins', updatedData)
  }
}

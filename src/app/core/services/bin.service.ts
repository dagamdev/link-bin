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

  constructor (private localStoreService: LocalStorageService) {
    this.bins.next(localStoreService.get('bins') ?? [])
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
    this.localStoreService.update('bins', updatedData)

    return newBin
  }

  deleteById (binId: string) {
    this.bins.next(this.bins.value.filter(b => b.id !== binId))
  }
}

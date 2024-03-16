import { Injectable } from '@angular/core'
import { type Bin } from '../models/bin'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BinService {
  bins = new BehaviorSubject<Bin[]>([])
  bins$ = this.bins.asObservable()

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const bins = JSON.parse(localStorage.getItem('bins') ?? 'undefined')
      console.log(bins)
    }
  }

  getById (binId: string) {
    return this.bins.value.find(b => b.id === binId)
  }

  create (newBinData: Omit<Bin, 'id'>) {
    const newBin = {
      id: crypto.randomUUID(),
      ...newBinData
    }
    this.bins.next([...this.bins.value, newBin])

    return newBin
  }
}

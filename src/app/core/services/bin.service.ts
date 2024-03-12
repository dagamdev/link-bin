import { Injectable } from '@angular/core'
import { type Bin } from '../models/bin'

@Injectable({
  providedIn: 'root'
})
export class BinService {
  #bins: Bin[] = [
    {
      id: '1',
      name: 'Hola',
      color: '#6666C8'
    },
    {
      id: '2',
      name: 'Tools',
      emoji: '🛠️',
      color: '#738387'
    },
    {
      id: '113',
      name: 'UI',
      emoji: '🪄',
      color: '#22CF90'
    },
    {
      id: '1asd',
      name: 'VIP',
      emoji: '⭐'
    },
    {
      id: '1k4',
      name: 'Hola'
    },
  ]

  constructor() { }

  get () {
    return this.#bins
  }
}

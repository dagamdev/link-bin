import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  noLocalStorage = typeof localStorage === 'undefined'

  constructor() { }

  get<T = any> (key: string): T | undefined {
    if (this.noLocalStorage) return undefined

    const strData = localStorage.getItem(key)

    return strData ? JSON.parse(strData) : undefined
  }

  update<T = any> (key: string, updatedData: T) {
    if (this.noLocalStorage) return

    localStorage.setItem(key, JSON.stringify(updatedData))
  }

  delete (key: string) {
    if (this.noLocalStorage) return

    localStorage.removeItem(key)
  }
}

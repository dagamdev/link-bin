import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  getLinks () {
    const links = localStorage.getItem('links')
    console.log(links)
    return links
  }
}

import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import type { Modal } from '../models/modal'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<Modal>()
  modalState$ = this.modalState.asObservable()
  private load = new BehaviorSubject(false)
  load$ = this.load.asObservable()

  constructor() { }

  openModal (modalData: Omit<Modal, 'show'>) {
    this.modalState.next({
      ...modalData,
      show: true
    })
  }
  
  closeModal () {
    this.modalState.next({
      type: 'create',
      target: 'bin',
      show: false
    })
  }

  loadModal (){
    if (!this.load.value) this.load.next(true)
  }
}

import { Component, ElementRef, ViewChild, signal } from '@angular/core'
import { ModalService } from '@/core/services/modal.service'
import { XComponent } from '@/icons/x/x.component'
import { BinService } from '@/core/services/bin.service'
import type { Modal } from '@/core/models/modal'
import type { Bin } from '@/core/models/bin'
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { LinkService } from '@/core/services/link.service'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [XComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>
  modalData = signal<Modal>({
    type: 'create',
    target: 'bin',
    show: false
  })
  bins = signal<Bin[]>([])
  textsDic = {
    'create': 'Crear',
    'update': 'Actualizar',
    'bin': 'contenedor',
    'link': 'enlace'
  }
  emojiRegex = /\p{Emoji}/
  defaultColor = '#737373'
  modalForm = new FormGroup({
    url: new FormControl('', 
      Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
    ),
    name: new FormControl('', Validators.required),
    description: new FormControl<string | undefined>(undefined),
    emoji: new FormControl<string | undefined>(undefined, Validators.pattern(/^(?:[\p{Emoji}]){1}$/u)),
    color: new FormControl(this.defaultColor),
    binId: new FormControl(''),
  })

  constructor (
    private modalService: ModalService,
    private binService: BinService,
    private linkService: LinkService,
    private http: HttpClient
  ) {
    modalService.modalState$.subscribe(data => {
      if (data.show) {
        this.dialog?.nativeElement.showModal()
      }
      this.modalData.set(data)
    })
    binService.bins$.subscribe(this.bins.set)
  }

  closeModal () {
    this.dialog?.nativeElement.setAttribute('close', '')
  }
  
  onAnimationEnd (event: AnimationEvent) {
    if (event.target instanceof HTMLDialogElement && event.target.hasAttribute('close')) {
      this.dialog?.nativeElement.removeAttribute('close')
      this.dialog?.nativeElement.close()
    }
  }

  onSubmit () {
    const valid = this.modalForm.valid
    console.log(this.modalForm.value)

    if (this.modalData().type === 'create') {
      if (this.modalData().target === 'bin') {
        this.binService.create({
          emoji: this.modalForm.value.emoji ?? undefined,
          name: this.modalForm.value.name as string,
          color: this.modalForm.value.color ?? this.defaultColor,
          description: this.modalForm.value.description ?? undefined
        })
      } else {
        this.linkService.create({
          url: this.modalForm.value.url as string,
          name: this.modalForm.value.name as string,
          binId: this.modalForm.value.binId ?? undefined, 
          description: this.modalForm.value.description ?? undefined,
        })
      }
    }
    
    if (valid) this.closeModal()
    this.modalForm.reset({ color: this.defaultColor })
  }

  lastTimeout?: NodeJS.Timeout
  onChangeUrl () {
    if (this.lastTimeout) clearTimeout(this.lastTimeout)  

    this.lastTimeout = setTimeout(() => {
      const url = this.modalForm.get('url')
  
      if (url?.valid) {
        this.http.get<{
          title: string
          description: string
        }>(`${environment.apiUrl}web/data?url=${url.value}`).subscribe(data => {
          if ('title' in data && 'description' in data) {
            this.modalForm.patchValue({
              name: data.title,
              description: data.description
            })
          }
        })
      }
    }, 600)
  }
}

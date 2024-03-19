export interface Modal {
  type: 'create' | 'update' | 'confirm'
  target: 'bin' | 'link'
  show: boolean
  confirmText?: string
  confirmAction?: () => void
  defaultData?: FormData
  updateElementId?: string
}

type FormData = Partial<Record<'url' | 'name' | 'emoji' | 'color' | 'binId' | 'description', string>>

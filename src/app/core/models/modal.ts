export interface Modal {
  type: 'create' | 'update'
  target: 'bin' | 'link'
  show: boolean
}

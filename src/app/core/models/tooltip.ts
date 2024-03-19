export interface Tooltip {
  x: number
  y: number
  type: 'normal' | 'bin' | 'link'
  content?: string
  direction: TooltipDirection
  target?: {
    width: number
    height: number
  }
}

type TooltipDirection = 'top' | 'bottom' | 'left' | 'right'

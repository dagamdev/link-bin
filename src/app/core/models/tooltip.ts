export interface Tooltip {
  x: number
  y: number
  type: 'normal' | 'bin' | 'link'
  content?: string
  direction: TooltipDirection
}

type TooltipDirection = 'top' | 'bottom' | 'left' | 'right'

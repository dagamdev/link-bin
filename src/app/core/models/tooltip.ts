export interface Tooltip {
  x: number
  y: number
  direction: TooltipDirection
  options: TooltipOption[]
}

type TooltipDirection = 'top' | 'bottom' | 'left' | 'right'
type TooltipOption = 'create' | 'update' | 'delete'

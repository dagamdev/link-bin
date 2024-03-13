import { type Routes } from '@angular/router' 
import { BinsListComponent } from './bins-list/bins-list.component'
import { BinComponent } from './bin/bin.component'

export default [
  {
    path: '',
    title: 'Bins | Link bin',
    component: BinsListComponent,
  },
  { 
    path: ':id',
    component: BinComponent 
  }
] as Routes

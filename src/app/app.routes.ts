import { Routes } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component'

export const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.routes') },
  { path: 'bins', loadChildren: () => import('./pages/bins/bins.routes') },
  { 
    title: 'Página no encontrada | Link bin',
    path: '**', 
    component: NotFoundComponent
  }
]

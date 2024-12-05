import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'asignatura-detalle',
    loadChildren: () => import('./asignatura-detalle/asignatura-detalle.module').then(m => m.AsignaturaDetallePageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then(m => m.BienvenidaPageModule),
  },
  {
    path: 'arquitectura',
    loadChildren: () => import('./arquitectura/arquitectura.module').then( m => m.ArquitecturaPageModule)
  },
  {
    path: 'matematicas',
    loadChildren: () => import('./matematicas/matematicas.module').then( m => m.MatematicasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

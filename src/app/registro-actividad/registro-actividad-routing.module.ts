import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroActividadPage } from './registro-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroActividadPageRoutingModule {}

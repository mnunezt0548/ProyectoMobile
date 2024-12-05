import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArquitecturaPage } from './arquitectura.page';

const routes: Routes = [
  {
    path: '',
    component: ArquitecturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArquitecturaPageRoutingModule {}

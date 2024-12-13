import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroActividadPageRoutingModule } from './registro-actividad-routing.module';

import { RegistroActividadPage } from './registro-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroActividadPageRoutingModule
  ],
  declarations: [RegistroActividadPage]
})
export class RegistroActividadPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArquitecturaPageRoutingModule } from './arquitectura-routing.module';

import { ArquitecturaPage } from './arquitectura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArquitecturaPageRoutingModule
  ],
  declarations: [ArquitecturaPage]
})
export class ArquitecturaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametroComponent } from './parametro/parametro.component';
import { ParametroFormComponent } from './parametro/parametro-form/parametro-form.component';
import { ParametroListComponent } from './parametro/parametro-list/parametro-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NegocioComponent } from './negocio/negocio.component';
import { NegocioListComponent } from './negocio/negocio-list/negocio-list.component';
import { NegocioFormComponent } from './negocio/negocio-form/negocio-form.component';



@NgModule({
  declarations: [
    ParametroComponent,
    ParametroFormComponent,
    ParametroListComponent,
    NegocioComponent,
    NegocioListComponent,
    NegocioFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class MantenimientoModule { }

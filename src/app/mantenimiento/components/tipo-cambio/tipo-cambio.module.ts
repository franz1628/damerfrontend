import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCambioListComponent } from './tipo-cambio-list/tipo-cambio-list.component';
import { TipoCambioFormComponent } from './tipo-cambio-form/tipo-cambio-form.component';
import { AddTipoCambioComponent } from './add-tipo-cambio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoCambioComponent } from './tipo-cambio.component';
import { SharedModule } from '../../../shared/shared.module';
import { TipoCambioRoutingModule } from './tipo-cambio-routing.module';


@NgModule({
  declarations: [
    TipoCambioComponent,
    TipoCambioListComponent,
    TipoCambioFormComponent,
    AddTipoCambioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TipoCambioRoutingModule,
    ReactiveFormsModule
  ]
})
export class TipoCambioModule { }

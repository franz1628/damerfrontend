import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AgrupacionCanalsDetalleComponent } from './agrupacion-canals-detalle/agrupacion-canals-detalle.component';
import { AgrupacionCanalsComponent } from './agrupacion-canals.component';
import { AgrupacionCanalsRoutingModule } from './agrupacion-canals-routing.module';



@NgModule({
  declarations: [
    AgrupacionCanalsDetalleComponent,
    AgrupacionCanalsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AgrupacionCanalsRoutingModule
  ]
})
export class AgrupacionCanalsModule { }

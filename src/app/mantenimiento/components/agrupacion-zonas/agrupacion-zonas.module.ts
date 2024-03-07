import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgrupacionZonasDetalleComponent } from './agrupacion-zonas-detalle/agrupacion-zonas-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AgrupacionZonasRoutingModule } from './agrupacion-zonas-routing.module';
import { AgrupacionZonasComponent } from './agrupacion-zonas.component';



@NgModule({
  declarations: [
    AgrupacionZonasDetalleComponent,
    AgrupacionZonasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AgrupacionZonasRoutingModule
  ]
})
export class AgrupacionZonasModule { }

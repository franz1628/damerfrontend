import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoComponent } from './contrato.component';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratoRoutingModule } from './contrato-routing.module';



@NgModule({
  declarations: [
    ContratoComponent,
    ContratoListComponent,
    ContratoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContratoRoutingModule
  ]
})
export class ContratoModule { }

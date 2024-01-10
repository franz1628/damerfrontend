import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoComponent } from './contrato.component';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';



@NgModule({
  declarations: [
    ContratoComponent,
    ContratoListComponent,
    ContratoFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContratoModule { }

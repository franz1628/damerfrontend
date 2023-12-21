import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MedicionRoutingModule } from './medicion-routing.module';
import { MedicionComponent } from './medicion.component';



@NgModule({
  declarations: [MedicionComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MedicionRoutingModule
  ]
})
export class MedicionModule { }

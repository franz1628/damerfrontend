import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MuestraIdealRoutingModule } from './muestra-ideal-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MuestraIdealRoutingModule
  ]
})
export class MuestraIdealModule { }

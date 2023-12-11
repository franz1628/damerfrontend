import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametroComponent } from './parametro.component';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';
import { ParametroListComponent } from './parametro-list/parametro-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ParametroRoutingModule } from './parametro-routing.module';

@NgModule({
  declarations: [
    ParametroComponent,
    ParametroFormComponent,
    ParametroListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ParametroRoutingModule,
    ReactiveFormsModule
    
  ],
  exports:[]
})
export class ParametroModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariableComponent } from './variable.component';
import { VariableFormComponent } from './variable-form/variable-form.component';
import { VariableListComponent } from './variable-list/variable-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { VariableRoutingModule } from './variable-routing.module';



@NgModule({
  declarations: [
    VariableComponent,
    VariableFormComponent,
    VariableListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    VariableRoutingModule,
    ReactiveFormsModule
  ]
})
export class VariableModule { }

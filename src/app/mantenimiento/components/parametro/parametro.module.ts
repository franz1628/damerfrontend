import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametroComponent } from './parametro.component';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';
import { ParametroListComponent } from './parametro-list/parametro-list.component';
import { BlackLoadingComponent } from '../../../shared/components/black-loading/black-loading.component';
import { InputControlComponent } from '../../../shared/components/form/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
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
    ParametroRoutingModule
    
  ],
  exports:[]
})
export class ParametroModule { }

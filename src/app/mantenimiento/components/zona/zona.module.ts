import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlackLoadingComponent } from '../../../shared/components/black-loading/black-loading.component';
import { InputControlComponent } from '../../../shared/components/form/input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ZonaComponent } from './zona.component';
import { ZonaFormComponent } from './zona-form/zona-form.component';
import { ZonaListComponent } from './zona-list/zona-list.component';
import { ZonaRoutingModule } from './zona-routing.module';

@NgModule({
  declarations: [
    ZonaComponent,
    ZonaFormComponent,
    ZonaListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ZonaRoutingModule,
    ReactiveFormsModule
    
  ],
  exports:[]
})
export class ZonaModule { }

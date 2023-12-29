import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

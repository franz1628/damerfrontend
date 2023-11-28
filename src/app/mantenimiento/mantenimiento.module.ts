import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { UbigeoModule } from './components/tablas/ubigeo/ubigeo.module';
import { ParametroFormComponent } from './components/parametro/parametro-form/parametro-form.component';
import { ParametroModule } from './components/parametro/parametro.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ParametroListComponent } from './components/parametro/parametro-list/parametro-list.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MantenimientoRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MantenimientoModule { }

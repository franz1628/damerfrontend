import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MantenimientoLayoutHeaderComponent } from './pages/mantenimiento-layout-header/mantenimiento-layout-header.component';
import { MantenimientoLayoutFooterComponent } from './pages/mantenimiento-layout-footer/mantenimiento-layout-footer.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MantenimientoLayoutHeaderComponent,
    MantenimientoLayoutFooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MantenimientoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports : [
    MantenimientoLayoutHeaderComponent,
    MantenimientoLayoutFooterComponent,
  ]
})
export class MantenimientoModule { }

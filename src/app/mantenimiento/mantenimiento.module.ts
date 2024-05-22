import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MantenimientoLayoutHeaderComponent } from './pages/mantenimiento-layout-header/mantenimiento-layout-header.component';
import { MantenimientoLayoutFooterComponent } from './pages/mantenimiento-layout-footer/mantenimiento-layout-footer.component';
import { AgrupacionZonasComponent } from './components/agrupacion-zonas/agrupacion-zonas.component';
import { AgrupacionCanalsComponent } from './components/agrupacion-canals/agrupacion-canals.component';
import { AgrupacionCanalsDetalleComponent } from './components/agrupacion-canals/agrupacion-canals-detalle/agrupacion-canals-detalle.component';
import { MuestraIdealComponent } from './components/muestra-ideal/muestra-ideal.component';
import { UniversoNegociosComponent } from './components/universo-negocios/universo-negocios.component';
import { FactorPenetracionComponent } from './components/factor-penetracion/factor-penetracion.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    MantenimientoLayoutHeaderComponent,
    MantenimientoLayoutFooterComponent,
    MuestraIdealComponent,
    UniversoNegociosComponent,
    FactorPenetracionComponent,
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

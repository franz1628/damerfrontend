import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametroComponent } from '../parametro/parametro.component';
import { ParametroFormComponent } from '../parametro/parametro-form/parametro-form.component';
import { ParametroListComponent } from '../parametro/parametro-list/parametro-list.component';
import { InputControlComponent } from '../../../shared/components/form/input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { TablasRoutingModule } from './tablas-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TablasComponent } from './tablas.component';
import { LayoutTablasComponent } from './pages/layout-tablas/layout-tablas.component';
import { MantenimientoModule } from '../../mantenimiento.module';
import { TipoUrbanizacionComponent } from './tipo-urbanizacion/tipo-urbanizacion.component';
import { TipoUrbanizacionFormComponent } from './tipo-urbanizacion/tipo-urbanizacion-form/tipo-urbanizacion-form.component';
import { TipoUrbanizacionListComponent } from './tipo-urbanizacion/tipo-urbanizacion-list/tipo-urbanizacion-list.component';
import { CanalComponent } from './canal/canal.component';
import { CanalFormComponent } from './canal/canal-form/canal-form.component';
import { CanalListComponent } from './canal/canal-list/canal-list.component';



@NgModule({
    declarations: [
        
    LayoutTablasComponent,
    TablasComponent,
    TipoUrbanizacionComponent,
    TipoUrbanizacionFormComponent,
    TipoUrbanizacionListComponent,
    CanalComponent,
    CanalFormComponent,
    CanalListComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        TablasRoutingModule,
        MantenimientoModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class TablasModule { }

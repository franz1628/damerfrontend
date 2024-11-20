import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DepartamentoComponent } from './ubigeo/components/departamento/departamento.component';
import { PaisFormComponent } from './ubigeo/components/pais/pais-form/pais-form.component';
import { PaisListComponent } from './ubigeo/components/pais/pais-list/pais-list.component';
import { DistritoFormComponent } from './ubigeo/components/distrito/distrito-form/distrito-form.component';
import { DistritoListComponent } from './ubigeo/components/distrito/distrito-list/distrito-list.component';
import { DepartamentoListComponent } from './ubigeo/components/departamento/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './ubigeo/components/departamento/departamento-form/departamento-form.component';
import { BlackLoadingComponent } from '../../../shared/components/black-loading/black-loading.component';
import { ProvinciaFormComponent } from './ubigeo/components/provincia/provincia-form/provincia-form.component';
import { ProvinciaListComponent } from './ubigeo/components/provincia/provincia-list/provincia-list.component';
import { DistritoComponent } from './ubigeo/components/distrito/distrito.component';
import { PaisComponent } from './ubigeo/components/pais/pais.component';
import { ProvinciaComponent } from './ubigeo/components/provincia/provincia.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { TipoUnidadMedidaComponent } from './tipo-unidad-medida/tipo-unidad-medida.component';
import { TipoUnidadMedidaListComponent } from './tipo-unidad-medida/tipo-unidad-medida-list/tipo-unidad-medida-list.component';
import { TipoUnidadMedidaFormComponent } from './tipo-unidad-medida/tipo-unidad-medida-form/tipo-unidad-medida-form.component';
import { UnidadMedidaFormComponent } from './unidad-medida/unidad-medida-form/unidad-medida-form.component';
import { UnidadMedidaListComponent } from './unidad-medida/unidad-medida-list/unidad-medida-list.component';
import { TipoInformeOrdenComponent } from './tipo-informe-orden/tipo-informe-orden.component';
import { TipoInformeOrdenListComponent } from './tipo-informe-orden/tipo-informe-orden-list/tipo-informe-orden-list.component';
import { TipoInformeOrdenFormComponent } from './tipo-informe-orden/tipo-informe-orden-form/tipo-informe-orden-form.component';
import { UrbanizacionComponent } from './ubigeo/components/urbanizacion/urbanizacion.component';
import { UrbanizacionListComponent } from './ubigeo/components/urbanizacion/urbanizacion-list/urbanizacion-list.component';
import { UrbanizacionFormComponent } from './ubigeo/components/urbanizacion/urbanizacion-form/urbanizacion-form.component';
import { UnidadVentaComponent } from './unidad-venta/unidad-venta.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';
import { TipoEstudioComponent } from './tipo-estudio/tipo-estudio.component';
import { ViaComponent } from './via/via.component';
import { TipoPresentacionComponent } from './tipo-presentacion/tipo-presentacion.component';
import { TipoMonedaComponent } from './tipo-moneda/tipo-moneda.component';



@NgModule({
    declarations: [
        
    LayoutTablasComponent,
    TablasComponent,
    TipoUrbanizacionComponent,
    TipoUrbanizacionFormComponent,
    TipoUrbanizacionListComponent,
    CanalComponent,
    CanalFormComponent,
    CanalListComponent,
    PaisComponent, 
    PaisFormComponent,
    PaisListComponent,
    ProvinciaFormComponent,
    ProvinciaListComponent,
    DepartamentoComponent, 
    DepartamentoFormComponent,
    DepartamentoListComponent,
    DistritoFormComponent,
    DistritoListComponent,
    DistritoComponent,
    ProvinciaComponent,
    ProvinciaFormComponent,
    ProvinciaListComponent,
    UnidadMedidaComponent,
    TipoUnidadMedidaComponent,
    TipoUnidadMedidaListComponent,
    TipoUnidadMedidaFormComponent,
    UnidadMedidaFormComponent,
    UnidadMedidaListComponent,
    TipoInformeOrdenComponent,
    TipoInformeOrdenListComponent,
    TipoInformeOrdenFormComponent,
    UrbanizacionComponent,
    UrbanizacionListComponent,
    UrbanizacionFormComponent,
    UnidadVentaComponent,
    TipoDireccionComponent,
    TipoEstudioComponent,
    ViaComponent,
    TipoPresentacionComponent,
    TipoMonedaComponent
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

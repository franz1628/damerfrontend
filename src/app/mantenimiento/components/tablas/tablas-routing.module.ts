import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from './ubigeo/components/pais/pais.component';
import { DepartamentoComponent } from './ubigeo/components/departamento/departamento.component';
import { ProvinciaComponent } from './ubigeo/components/provincia/provincia.component';
import { DistritoComponent } from './ubigeo/components/distrito/distrito.component';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { Error404PageComponent } from '../../../shared/pages/error404-page/error404-page.component';
import { TablasComponent } from './tablas.component';
import { LayoutTablasComponent } from './pages/layout-tablas/layout-tablas.component';
import { TipoUrbanizacionComponent } from './tipo-urbanizacion/tipo-urbanizacion.component';
import { CanalComponent } from './canal/canal.component';
import { TipoUnidadMedidaComponent } from './tipo-unidad-medida/tipo-unidad-medida.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { TipoInformeOrdenComponent } from './tipo-informe-orden/tipo-informe-orden.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutTablasComponent,
    children: [
      { path: 'pais', component: PaisComponent },
      { path: 'departamento', component: DepartamentoComponent },
      { path: 'provincia', component: ProvinciaComponent },
      { path: 'distrito', component: DistritoComponent },
      { path: 'tipoUrbanizacion', component: TipoUrbanizacionComponent },
      { path: 'canal', component: CanalComponent },
      { path: 'tipoUnidadMedida', component: TipoUnidadMedidaComponent },
      { path: 'tipoInformeOrden', component: TipoInformeOrdenComponent },
      { path: 'unidadMedida', component: UnidadMedidaComponent }
      , {
        path: '404', 
        component: Error404PageComponent,
      },
      {
        path: '', 
        component: TablasComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablasRoutingModule { }

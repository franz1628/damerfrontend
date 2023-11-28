import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from './ubigeo/components/pais/pais.component';
import { DepartamentoComponent } from './ubigeo/components/departamento/departamento.component';
import { ProvinciaComponent } from './ubigeo/components/provincia/provincia.component';
import { DistritoComponent } from './ubigeo/components/distrito/distrito.component';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { Error404PageComponent } from '../../../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path:'pais',component:PaisComponent},
      {path:'departamento',component:DepartamentoComponent},
      {path:'provincia',component:ProvinciaComponent},
      {path:'distrito',component:DistritoComponent},
      {
        path: '404',
        component: Error404PageComponent,
      },
      {
        path: '',
        redirectTo: 'pais',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablasRoutingModule { }
 
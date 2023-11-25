import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from './ubigeo/pais/pais.component';
import { DepartamentoComponent } from './ubigeo/departamento/departamento.component';
import { ProvinciaComponent } from './ubigeo/provincia/provincia.component';
import { DistritoComponent } from './ubigeo/distrito/distrito.component';
import { ParametroComponent } from './mantenimiento/parametro/parametro.component';
import { NegocioComponent } from './mantenimiento/negocio/negocio.component';

const routes: Routes = [
  {
    path: 'negocio',
    component: NegocioComponent
  },
  {
    path: 'parametro',
    component: ParametroComponent
  },
  {
    path: 'pais',
    component: PaisComponent
  },
  {
    path: 'departamento',
    component: DepartamentoComponent
  },
  {
    path: 'provincia',
    component: ProvinciaComponent
  },
  {
    path: 'distrito',
    component: DistritoComponent
  },
  {
    path: 'negocio',
    component : NegocioComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NegocioComponent } from './negocio/negocio.component';
import { PaisComponent } from './ubigeo/pais/pais.component';
import { DepartamentoComponent } from './ubigeo/departamento/departamento.component';
import { ProvinciaComponent } from './ubigeo/provincia/provincia.component';
import { DistritoComponent } from './ubigeo/distrito/distrito.component';

const routes: Routes = [
  {
    path: 'negocio',
    component: NegocioComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

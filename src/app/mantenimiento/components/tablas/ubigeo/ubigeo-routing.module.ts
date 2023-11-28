import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from './components/pais/pais.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { LayoutPageComponent } from '../../../pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'pais', component: PaisComponent },
      { path: 'departamento', component: DepartamentoComponent },
      { path: 'provincia', component: ProvinciaComponent },
      { path: 'distrito', component: DistritoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbigeoRoutingModule { }
 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { Error404PageComponent } from '../../../shared/pages/error404-page/error404-page.component';
import { VariedadesComponent } from './variedades.component';


const routes: Routes = [
  {
    path: '',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:VariedadesComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariedadesRoutingModule { }
 
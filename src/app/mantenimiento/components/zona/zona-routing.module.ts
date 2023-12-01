import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from '../../../shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { ZonaComponent } from './zona.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:ZonaComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaRoutingModule { }

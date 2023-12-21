import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { MedicionComponent } from './medicion.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:MedicionComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MedicionRoutingModule { }

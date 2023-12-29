import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../../pages/layout-page/layout-page.component';
import { ClienteComponent } from './cliente.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:ClienteComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ClienteRoutingModule { }

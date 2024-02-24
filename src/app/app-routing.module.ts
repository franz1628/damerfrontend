import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { HomeComponent } from './home/home.component';
import { LayoutPageComponent } from './mantenimiento/pages/layout-page/layout-page.component';

const routes: Routes = [
 
  {
    path: '404',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:Error404PageComponent
      }
    ]
  },
  
  {
    path: '',
    component:LayoutPageComponent,
    children :[
      {
        path:'',
        component:HomeComponent
      }
    ]
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
  },
  {
    path: '**',
    redirectTo: '404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

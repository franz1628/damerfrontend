import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { HomeComponent } from './home/home.component';
import { LayoutPageComponent } from './mantenimiento/pages/layout-page/layout-page.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
 
 
  
  {
    path: '',
    component:LayoutPageComponent,
    // canActivate: [authGuard],
    children :[
      {
        path:'',
        component:HomeComponent
      }
    ]
  },
  {
    path: '404',
    children :[
      {
        path:'',
        component:Error404PageComponent
      }
    ]
  },
  {
    path: 'mantenimiento',
    // canActivate: [authGuard],
    loadChildren: () => import('./mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)
  },
  { path: 'login', component: LoginFormComponent },
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

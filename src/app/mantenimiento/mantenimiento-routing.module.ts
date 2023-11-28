import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tablas',
        loadChildren: () => import('./components/tablas/tablas.module').then(m => m.TablasModule)
      },
      {
        path: 'parametro',
        loadChildren: () => import('./components/parametro/parametro.module').then(m => m.ParametroModule)
      },
      {
        path: 'negocio',
        loadChildren: () => import('./components/negocio/negocio.module').then(m => m.NegocioModule)
      },
      {
        path: '404',
        component: Error404PageComponent,
      },
      {
        path: '',
        redirectTo: 'parametro',
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
export class MantenimientoRoutingModule { }

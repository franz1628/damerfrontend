import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { ZonaComponent } from './components/zona/zona.component';
import { roleGuard } from '../role.guard';
import { canViewGuard } from '../canView.guard';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'parametro',
        loadChildren: () => import('./components/parametro/parametro.module').then(m => m.ParametroModule)
      },
      {
        path: 'negocio',
        loadChildren: () => import('./components/negocio/negocio.module').then(m => m.NegocioModule)
      },
      {
        path: 'variedades',
        loadChildren: () => import('./components/variedades/variedades.module').then(m => m.VariedadesModule)
      },
      {
        path: 'medicion',
        loadChildren: () => import('./components/medicion/medicion.module').then(m => m.MedicionModule)
      },
      {
        path: 'tipoCambio',
        loadChildren: () => import('./components/tipo-cambio/tipo-cambio.module').then(m => m.TipoCambioModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./components/cliente/cliente.module').then(m => m.ClienteModule)
      },
      {
        path: 'atributoTecnicoVariedad',
        loadChildren: () => import('./components/atributo-tecnico-variedad/atributo-tecnico-variedad.module').then(m => m.AtributoTecnicoVariedadModule)
      },
      {
        path: 'atributoTecnicoNegocio',
        loadChildren: () => import('./components/atributo-tecnico-negocio/atributo-tecnico-negocio.module').then(m => m.AtributoTecnicoNegocioModule)
      },
      {
        path: 'tablas',
        loadChildren: () => import('./components/tablas/tablas.module').then(m => m.TablasModule),
        canActivate: [canViewGuard(1)]
      },
      {
        path: 'variable',
        loadChildren: () => import('./components/variable/variable.module').then(m => m.VariableModule),
    
      },
      {
        path: 'contrato',
        loadChildren: () => import('./components/contrato/contrato.module').then(m => m.ContratoModule)
      },
      {
        path: 'zona',
        loadChildren: () => import('./components/zona/zona.module').then(m => m.ZonaModule)
      }, {
        path: 'agrupacionZonas',
        loadChildren: () => import('./components/agrupacion-zonas/agrupacion-zonas.module').then(m => m.AgrupacionZonasModule)
      }, {
        path: 'agrupacionCanales',
        loadChildren: () => import('./components/agrupacion-canals/agrupacion-canals.module').then(m => m.AgrupacionCanalsModule)
      }, {
        path: 'muestraIdeal',
        loadChildren: () => import('./components/muestra-ideal/muestra-ideal.module').then(m => m.MuestraIdealModule)
      }, {
        path: 'universoNegocios',
        loadChildren: () => import('./components/universo-negocios/universo-negocios.module').then(m => m.UniversoNegociosModule)
      }, {
        path: 'factorPenetracion',
        loadChildren: () => import('./components/factor-penetracion/factor-penetracion.module').then(m => m.FactorPenetracionModule)
      },{
        path: 'usuario',
        loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate: [canViewGuard(16)]
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

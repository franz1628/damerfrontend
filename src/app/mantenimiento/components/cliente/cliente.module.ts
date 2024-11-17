import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteDireccionFormComponent } from './cliente-direccion-form/cliente-direccion-form.component';
import { ClienteDireccionListComponent } from './cliente-direccion-list/cliente-direccion-list.component';
import { ClienteContactoListComponent } from './cliente-contacto-list/cliente-contacto-list.component';
import { ClienteContactoFormComponent } from './cliente-contacto-form/cliente-contacto-form.component';
import { ClienteCategoriaListComponent } from './cliente-categoria-list/cliente-categoria-list.component';
import { ClienteCategoriaFormComponent } from './cliente-categoria-form/cliente-categoria-form.component';
import { ClienteCanalFormComponent } from './cliente-canal-form/cliente-canal-form.component';
import { ClienteZonaFormComponent } from './cliente-zona-form/cliente-zona-form.component';
import { ClienteFormulaComponent } from './cliente-formula/cliente-formula.component';
import { ClienteAtributoFuncionalComponent } from './cliente-atributo-funcional/cliente-atributo-funcional.component';
import { ClienteAtributoValorComponent } from './cliente-atributo-valor/cliente-atributo-valor.component';
import { ClienteAtributoFormulaComponent } from './cliente-atributo-formula/cliente-atributo-formula.component';
import { ClienteAtributoFiltroComponent } from './cliente-atributo-filtro/cliente-atributo-filtro.component';
import { ClienteConcatenacionComponent } from './cliente-concatenacion/cliente-concatenacion.component';
import { ClienteResultadosComponent } from './cliente-resultados/cliente-resultados.component';
import { ClienteResultadosFiltroComponent } from './cliente-resultados-filtro/cliente-resultados-filtro.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ClienteComponent, ClienteFormComponent, ClienteListComponent, ClienteDireccionFormComponent, ClienteDireccionListComponent, ClienteContactoListComponent, ClienteContactoFormComponent, ClienteCategoriaListComponent, ClienteCategoriaFormComponent, ClienteCanalFormComponent, ClienteZonaFormComponent, ClienteFormulaComponent, ClienteAtributoFuncionalComponent, ClienteAtributoValorComponent, ClienteAtributoFormulaComponent, ClienteAtributoFiltroComponent, ClienteConcatenacionComponent, ClienteResultadosComponent, ClienteResultadosFiltroComponent],
  imports: [

    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    NgSelectModule
  ]
})
export class ClienteModule { }

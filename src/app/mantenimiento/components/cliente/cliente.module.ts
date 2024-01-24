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
import { ClienteCanalListComponent } from './cliente-canal-list/cliente-canal-list.component';
import { ClienteCanalFormComponent } from './cliente-canal-form/cliente-canal-form.component';
import { ClienteZonaListComponent } from './cliente-zona-list/cliente-zona-list.component';
import { ClienteZonaFormComponent } from './cliente-zona-form/cliente-zona-form.component';
import { ClienteAtributoFuncionalListComponent } from './cliente-atributo-funcional-list/cliente-atributo-funcional-list.component';
import { ClienteAtributoFuncionalFormComponent } from './cliente-atributo-funcional-form/cliente-atributo-funcional-form.component';

@NgModule({
  declarations: [ClienteComponent, ClienteFormComponent, ClienteListComponent, ClienteDireccionFormComponent, ClienteDireccionListComponent, ClienteContactoListComponent, ClienteContactoFormComponent, ClienteCategoriaListComponent, ClienteCategoriaFormComponent, ClienteCanalListComponent, ClienteCanalFormComponent, ClienteZonaListComponent, ClienteZonaFormComponent, ClienteAtributoFuncionalListComponent, ClienteAtributoFuncionalFormComponent],
  imports: [

    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }

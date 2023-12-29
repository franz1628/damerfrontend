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

@NgModule({
  declarations: [ClienteComponent, ClienteFormComponent, ClienteListComponent, ClienteDireccionFormComponent, ClienteDireccionListComponent, ClienteContactoListComponent, ClienteContactoFormComponent],
  imports: [

    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }

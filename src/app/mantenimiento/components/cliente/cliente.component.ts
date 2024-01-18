import { Component, ViewChild } from '@angular/core';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { Cliente, ClienteInit } from '../../interface/cliente';
import { ClienteDireccionListComponent } from './cliente-direccion-list/cliente-direccion-list.component';
import { ClienteContactoListComponent } from './cliente-contacto-list/cliente-contacto-list.component';
import { ClienteDireccionFormComponent } from './cliente-direccion-form/cliente-direccion-form.component';
import { ClienteContactoFormComponent } from './cliente-contacto-form/cliente-contacto-form.component';
import { ClienteDireccion } from '../../interface/clienteDireccion';
import { ClienteContacto } from '../../interface/clienteContacto';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {
  model : Cliente = ClienteInit;

  @ViewChild('clienteListComp')
  clienteListComp!: ClienteListComponent;

  @ViewChild('clienteDireccionListComp')
  clienteDireccionListComp!: ClienteDireccionListComponent;

  @ViewChild('clienteContactoListComp')
  clienteContactoListComp!: ClienteContactoListComponent;

  @ViewChild('clienteFormComp')
  clienteFormComp!: ClienteFormComponent;

  @ViewChild('clienteDireccionFormComp')
  clienteDireccionFormComp!: ClienteDireccionFormComponent;

  @ViewChild('clienteContactoFormComp')
  clienteContactoFormComp!: ClienteContactoFormComponent;

  actualizarList(){
    this.clienteListComp.actualizarList();
  }

  actualizarDireccionList(){
    this.clienteDireccionListComp.actualizarList();
  }

  actualizarContactoList(){
    this.clienteContactoListComp.actualizarList();
  }

  selectEdit(model:Cliente){
    this.model = model;
    console.log(model);
    
    this.clienteFormComp.selectEdit(model);
  }

  resetModel(){
   
    
    this.model = ClienteInit;
    console.log(this.model);
  }

  selectDireccionEdit(model:ClienteDireccion){
    this.clienteDireccionFormComp.selectEdit(model);
  }

  selectContactoEdit(model:ClienteContacto){
    this.clienteContactoFormComp.selectEdit(model);
  }
}

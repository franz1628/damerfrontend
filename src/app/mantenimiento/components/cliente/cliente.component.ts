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
import { ClienteCategoria } from '../../interface/clienteCategoria';
import { ClienteCategoriaFormComponent } from './cliente-categoria-form/cliente-categoria-form.component';
import { ClienteCategoriaListComponent } from './cliente-categoria-list/cliente-categoria-list.component';
import { ClienteCanal } from '../../interface/clienteCanal';
import { ClienteZona } from '../../interface/clienteZona';
import { ClienteCanalFormComponent } from './cliente-canal-form/cliente-canal-form.component';
import { ClienteZonaFormComponent } from './cliente-zona-form/cliente-zona-form.component';
import { ClienteCanalListComponent } from './cliente-canal-list/cliente-canal-list.component';
import { ClienteZonaListComponent } from './cliente-zona-list/cliente-zona-list.component';
import { Categoria, CategoriaInit } from '../variedades/interfaces/categoria.interface';
import { AtributoFuncionalVariedad } from '../../interface/atributoFuncionalVariedad';
import { ClienteAtributoFuncionalFormComponent } from './cliente-atributo-funcional-form/cliente-atributo-funcional-form.component';
import { ClienteAtributoFuncionalListComponent } from './cliente-atributo-funcional-list/cliente-atributo-funcional-list.component';
import { ClienteFormulaComponent } from './cliente-formula/cliente-formula.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {
  model : Cliente = ClienteInit;
  modelCategoria : Categoria = CategoriaInit;
  showModalFormula: boolean = false;

  @ViewChild('clienteListComp')
  clienteListComp!: ClienteListComponent;
 
  @ViewChild('clienteDireccionListComp') 
  clienteDireccionListComp!: ClienteDireccionListComponent;

  @ViewChild('clienteContactoListComp')
  clienteContactoListComp!: ClienteContactoListComponent;

  @ViewChild('clienteCategoriaListComp')
  clienteCategoriaListComp!: ClienteCategoriaListComponent;

  @ViewChild('clienteAtributoFuncionalListComp')
  clienteAtributoFuncionalListComp!: ClienteAtributoFuncionalListComponent;

  @ViewChild('clienteCanalListComp')
  clienteCanalListComp!: ClienteCanalListComponent;

  @ViewChild('clienteZonaListComp')
  clienteZonaListComp!: ClienteZonaListComponent;

  @ViewChild('clienteFormComp') 
  clienteFormComp!: ClienteFormComponent;

  @ViewChild('clienteDireccionFormComp')
  clienteDireccionFormComp!: ClienteDireccionFormComponent;

  @ViewChild('clienteContactoFormComp')
  clienteContactoFormComp!: ClienteContactoFormComponent;

  @ViewChild('clienteCategoriaFormComp')
  clienteCategoriaFormComp!: ClienteCategoriaFormComponent;

  @ViewChild('clienteAtributoFuncionalFormComp')
  clienteAtributoFuncionalFormComp!: ClienteAtributoFuncionalFormComponent;

  @ViewChild('clienteCanalFormComp')
  clienteCanalFormComp!: ClienteCanalFormComponent;

  @ViewChild('clienteZonaFormComp')
  clienteZonaFormComp!: ClienteZonaFormComponent;
  
  @ViewChild('clienteFormulaComp')
  clienteFormulaComp!: ClienteFormulaComponent;

  get getModel(){
    return this.model
  }
 
  get getModelCategoria(){
    return this.modelCategoria
  }

  actualizarList(){
    this.clienteListComp.actualizarList();
  }

  actualizarDireccionList(){
    this.clienteDireccionListComp.actualizarList();
  }

  actualizarContactoList(){
    this.clienteContactoListComp.actualizarList();
  }

  actualizarCategoriaList(){
    this.clienteCategoriaListComp.actualizarList();
  }

  actualizarAtributoList(){
    this.clienteAtributoFuncionalListComp.actualizarList();
  }

  actualizarCanalList(){
    this.clienteCanalListComp.actualizarList();
  }

  actualizarZonaList(){
    this.clienteZonaListComp.actualizarList();
  }

  selectEdit(model:Cliente){
    this.model = model; 
    
    this.clienteFormComp.selectEdit(model);
  }

  resetModel(){
    this.model = ClienteInit; 
  }

  selectDireccionEdit(model:ClienteDireccion){
    this.clienteDireccionFormComp.selectEdit(model);
  }

  selectContactoEdit(model:ClienteContacto){
    this.clienteContactoFormComp.selectEdit(model);
  }

  selectCategoriaEdit(model:ClienteCategoria){
    this.clienteCategoriaFormComp.selectEdit(model); 
    this.modelCategoria = model.Categoria;
    
  }

  selectAtributoEdit(model:AtributoFuncionalVariedad){
    this.clienteAtributoFuncionalFormComp.selectEdit(model); 
    this.clienteFormulaComp.cargaAtributosValores(model.Categoria);
  }

  selectCanalEdit(model:ClienteCanal){
    this.clienteCanalFormComp.selectEdit(model); 
  }

  selectZonaEdit(model:ClienteZona){
    this.clienteZonaFormComp.selectEdit(model); 
  }

  abrirModalFormular(){
    this.showModalFormula = true;
  }

}

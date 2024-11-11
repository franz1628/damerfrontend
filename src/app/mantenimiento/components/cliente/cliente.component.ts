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
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../interface/atributoFuncionalVariedad';
import { ClienteFormulaComponent } from './cliente-formula/cliente-formula.component';
import { AlertService } from '../../../shared/services/alert.service';
import { ClienteAgrupacionCategoria, ClienteAgrupacionCategoriaInit } from '../../interface/clienteAgrupacionCategoria';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent {

  model : Cliente = ClienteInit;
  modelCategoria : Categoria = CategoriaInit;
  atributoFuncionalVariedad : AtributoFuncionalVariedad = AtributoFuncionalVariedadInit;
  showModalFormula: boolean = false;
  clienteAgrupacionCategoria = ClienteAgrupacionCategoriaInit

  constructor(
    private alert: AlertService
  ){

  }

  showLoading: boolean = false;

  @ViewChild('clienteListComp')
  clienteListComp!: ClienteListComponent;
 
  @ViewChild('clienteDireccionListComp') 
  clienteDireccionListComp!: ClienteDireccionListComponent;

  @ViewChild('clienteContactoListComp')
  clienteContactoListComp!: ClienteContactoListComponent;

  @ViewChild('clienteCategoriaListComp')
  clienteCategoriaListComp!: ClienteCategoriaListComponent;

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
    this.clienteDireccionListComp.actualizarList(this.model.id);
  }

  actualizarContactoList(){
    this.clienteContactoListComp.actualizarList(this.model.id);
  }

  actualizarCategoriaList(){
    //this.clienteCategoriaListComp.actualizarList();
  }

  actualizarCanalList(){
    this.clienteCanalListComp.actualizarList(this.model.id);
  }

  actualizarZonaList(){
    this.clienteZonaListComp.actualizarList(this.model.id);
  }

  async selectEdit(model:Cliente){
    this.showLoading = true;
    this.model = model; 
    this.clienteAgrupacionCategoria = ClienteAgrupacionCategoriaInit
    
    this.clienteFormComp.selectEdit(model);
    if(this.model.id!=0){
      await this.clienteContactoListComp.actualizarList(this.model.id);
      await this.clienteDireccionListComp.actualizarList(this.model.id);
      await this.clienteCategoriaListComp.loadModels(this.model.id);
      await this.clienteCanalListComp.actualizarList(this.model.id);
      await this.clienteZonaListComp.actualizarList(this.model.id);
    }
    this.showLoading=false;
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

  get getClienteAgrupacionCategoria (){
    return this.clienteAgrupacionCategoria
  }

  selectCategoriaEdit(model:ClienteAgrupacionCategoria){
   // this.clienteCategoriaFormComp.selectEdit(model); 
   // this.modelCategoria = model.Categoria;
    this.clienteAgrupacionCategoria = model
   
    
  }

  selectAtributoEdit(model:AtributoFuncionalVariedad){
    // this.clienteFormulaComp.cargaAtributosValores(model.Categoria);
    // this.atributoFuncionalVariedad = model;
  }

  selectCanalEdit(model:ClienteCanal){
    this.clienteCanalFormComp.selectEdit(model); 
  }

  selectZonaEdit(model:ClienteZona){
    this.clienteZonaFormComp.selectEdit(model); 
  }

  abrirModalFormular(){
    if(this.atributoFuncionalVariedad.id!=0){
      this.showModalFormula = true;
    }else{
      this.alert.showAlert('Mensaje','Debe escoger un atributo funcional','warning');
    }
  }

}

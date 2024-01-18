import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteDireccion } from '../../../interface/clienteDireccion';
import { ClienteDireccionService } from '../../../service/clienteDireccion';
import { Cliente, ClienteInit } from '../../../interface/cliente';

@Component({
  selector: 'app-cliente-direccion-list',
  templateUrl: './cliente-direccion-list.component.html'
})
export class ClienteDireccionListComponent {
  public models:ClienteDireccion[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteDireccion> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;

  constructor(public service : ClienteDireccionService){ }

  ngOnInit(): void { 
    this.actualizarList();
  }

  selectEdit(model:ClienteDireccion){
    this.selectEditEmit.emit(model);
  }

  get getModel(){
    return this.cliente;
  }

  actualizarList(){
    this.loading=true;
    this.service.getCodCliente(this.getModel.codigo).subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}

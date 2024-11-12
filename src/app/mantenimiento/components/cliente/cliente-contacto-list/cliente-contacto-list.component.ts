import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteContacto } from '../../../interface/clienteContacto';
import { ClienteContactoService } from '../../../service/clienteContacto';
import { Cliente, ClienteInit } from '../../../interface/cliente';

@Component({
  selector: 'app-cliente-contacto-list',
  templateUrl: './cliente-contacto-list.component.html'
})
export class ClienteContactoListComponent {
  public models:ClienteContacto[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteContacto> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;

  constructor(public service : ClienteContactoService){ }

  ngOnInit(): void {
    //this.actualizarList(this.getModel.id);
  }

  selectEdit(model:ClienteContacto){
    this.selectEditEmit.emit(model);
  }

  get getModel(){
    return this.cliente;
  }

  async actualizarList(idCliente:number){
    this.loading=true;
     this.service.getIdCliente(idCliente).subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}

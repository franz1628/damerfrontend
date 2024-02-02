import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';

@Component({
  selector: 'app-cliente-canal-list',
  templateUrl: './cliente-canal-list.component.html'
})
export class ClienteCanalListComponent {
  public models:ClienteCanal[] = [];    
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteCanal> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;
 
  constructor(public service : ClienteCanalService, private alert:AlertService){ }

  ngOnInit(): void {
    this.actualizarList();
  } 
  
  selectEdit(model:ClienteCanal){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.postIdCliente(this.cliente.id).subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
      
    })
  }

  borrar(model:ClienteCanal){
    this.alert.showAlertConfirm('Advertencia','¿Desea suspender?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.actualizarList();
      })
    })
  }
}

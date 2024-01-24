import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteCategoria } from '../../../interface/clienteCategoria';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';

@Component({
  selector: 'app-cliente-categoria-list',
  templateUrl: './cliente-categoria-list.component.html'
})
export class ClienteCategoriaListComponent {
  public models:ClienteCategoria[] = [];    
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteCategoria> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;
 
  constructor(public service : ClienteCategoriaService, private alert:AlertService){ }

  ngOnInit(): void {
    this.actualizarList();
  } 
  
  selectEdit(model:ClienteCategoria){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.getCodCliente(this.cliente.codigo).subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }

  borrar(model:ClienteCategoria){
    this.alert.showAlertConfirm('Advertencia','¿Desea suspender?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.actualizarList();
      })
    })
  }
}

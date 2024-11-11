import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClienteDireccion } from '../../../interface/clienteDireccion';
import { ClienteDireccionService } from '../../../service/clienteDireccion';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { AlertService } from '../../../../shared/services/alert.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cliente-direccion-list',
  templateUrl: './cliente-direccion-list.component.html'
})
export class ClienteDireccionListComponent implements OnChanges{

  public models:ClienteDireccion[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteDireccion> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;

  constructor(
    private service : ClienteDireccionService,
    private alert: AlertService
  ){ }

  ngOnInit(): void { 
    this.actualizarList(this.cliente.id);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      //this.actualizarList(this.cliente.id);
    }
  }

  selectEdit(model:ClienteDireccion){
    this.selectEditEmit.emit(model);
  }

  get getModel(){
    return this.cliente;
  }

  async actualizarList(idCliente: number): Promise<void> {
    this.loading = true;
    try {
      const resp = await firstValueFrom(this.service.getIdCliente(idCliente));
      this.models = resp.data;
    } finally {
      this.loading = false;
    }
  }

  delete(model: ClienteDireccion) {
    this.alert.showAlertConfirm('Advertencia','Desea eliminar?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.alert.showAlert('Mensaje','Eliminado correctamente','success');
        this.actualizarList(model.idCliente)
      })
    })
  }

}

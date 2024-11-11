import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteZona } from '../../../interface/clienteZona';
import { ClienteZonaService } from '../../../service/clienteZona';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cliente-zona-list',
  templateUrl: './cliente-zona-list.component.html'
})
export class ClienteZonaListComponent {
  public models:ClienteZona[] = [];    
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteZona> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit;
 
  constructor(public service : ClienteZonaService, private alert:AlertService){ }

  ngOnInit(): void {
    this.actualizarList(this.cliente.id);
  } 
  
  selectEdit(model:ClienteZona){
    this.selectEditEmit.emit(model);
  }

  async actualizarList(idCliente: number): Promise<void> {
    this.loading = true;
    try {
      const resp = await firstValueFrom(this.service.postIdCliente(idCliente));
      this.models = resp.data;
    } finally {
      this.loading = false;
    }
  }




  borrar(model:ClienteZona){
    this.alert.showAlertConfirm('Advertencia','¿Desea suspender?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.actualizarList(this.cliente.id);
      })
    })
  }
}

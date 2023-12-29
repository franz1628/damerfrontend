import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteDireccion } from '../../../interface/clienteDireccion';
import { ClienteDireccionService } from '../../../service/clienteDireccion';

@Component({
  selector: 'app-cliente-direccion-list',
  templateUrl: './cliente-direccion-list.component.html'
})
export class ClienteDireccionListComponent {
  public models:ClienteDireccion[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteDireccion> = new EventEmitter();

  constructor(public service : ClienteDireccionService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:ClienteDireccion){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.get().subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}

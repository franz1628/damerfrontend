import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteContacto } from '../../../interface/clienteContacto';
import { ClienteContactoService } from '../../../service/clienteContacto';

@Component({
  selector: 'app-cliente-contacto-list',
  templateUrl: './cliente-contacto-list.component.html'
})
export class ClienteContactoListComponent {
  public models:ClienteContacto[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<ClienteContacto> = new EventEmitter();

  constructor(public service : ClienteContactoService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:ClienteContacto){
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

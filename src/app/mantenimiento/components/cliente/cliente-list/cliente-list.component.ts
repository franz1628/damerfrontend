import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../../../interface/cliente';
import { ClienteService } from '../../../service/cliente';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent {
  public models:Cliente[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<Cliente> = new EventEmitter();

  constructor(public service : ClienteService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:Cliente){
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

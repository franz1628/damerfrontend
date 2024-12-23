import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from '../../../interface/cliente';
import { ClienteService } from '../../../service/cliente';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html' 
}) 
export class ClienteListComponent {  
  public models:Cliente[] = [];    
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<Cliente> = new EventEmitter();

  selectIndex:number=-1

 
  constructor(public service : ClienteService, private alert:AlertService){ }

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
 
  borrar(model:Cliente){
    this.alert.showAlertConfirm('Advertencia','¿Desea suspender?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.actualizarList();
      })
    }) 
  }

  elegir(index: number,model:Cliente) {
    this.selectIndex=index 
    this.selectEditEmit.emit(model)

  }
}

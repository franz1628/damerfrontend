import { Component, EventEmitter, Output } from '@angular/core';
import { TipoCambio } from '../../../interface/tipoCambio.interface';
import { TipoCambioService } from '../../../service/tipoCambio.service';
import { AlertService } from '../../../../shared/services/alert.service';



@Component({
  selector: 'app-tipo-cambio-list',
  templateUrl: './tipo-cambio-list.component.html'
})
export class TipoCambioListComponent {

  public models:TipoCambio[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<TipoCambio> = new EventEmitter();

  constructor(
    private service : TipoCambioService,
    private alert:AlertService

  ){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:TipoCambio){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.get().subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }

  delete(model:TipoCambio) {
    this.alert.showAlertConfirm('Advertencia','Desea eliminar el tipo de cambio','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        if(x.state==1){
          this.alert.showAlert('Mensaje','Borrado correctamente','success');
          this.actualizarList();
        }else{
          this.alert.showAlert('Mensaje','Hubo un problema en el servidor','success');
        }
        
      })
    })
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { TipoCambio } from '../../../interface/tipoCambio.interface';
import { TipoCambioService } from '../../../service/tipoCambio.service';

@Component({
  selector: 'app-tipo-cambio-list',
  templateUrl: './tipo-cambio-list.component.html'
})
export class TipoCambioListComponent {
  public models:TipoCambio[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<TipoCambio> = new EventEmitter();

  constructor(public service : TipoCambioService){ }

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

}

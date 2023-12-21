import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoCambio, TipoCambioInit } from '../../interface/tipoCambio.interface';
import { TipoCambioService } from '../../service/tipoCambio.service';

@Component({
  selector: 'app-add-tipo-cambio', 
  template:'<button class="btn btn-success" (click)="agregar()">Add</button>'
})
export class AddTipoCambioComponent {
  @Input() model:TipoCambio = TipoCambioInit
  @Output() actualizarList:EventEmitter<null> = new EventEmitter();

  constructor(public service :TipoCambioService){}

  agregar(){
    return this.service.add(this.model).subscribe(resp=>{
      this.actualizarList.emit();
    })
  }
}

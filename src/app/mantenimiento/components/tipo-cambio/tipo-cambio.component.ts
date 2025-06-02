import { Component, ViewChild } from '@angular/core';
import { TipoCambioListComponent } from './tipo-cambio-list/tipo-cambio-list.component';
import { TipoCambioFormComponent } from './tipo-cambio-form/tipo-cambio-form.component';
import { TipoCambio } from '../../interface/tipoCambio.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html'
})
export class TipoCambioComponent {
  @ViewChild('tipoCambioListComp')
  tipoCambioListComp!: TipoCambioListComponent;

  @ViewChild('tipoCambioFormComp')
  tipoCambioFormComp!: TipoCambioFormComponent;

  constructor(public authService: AuthService) { }
  
  actualizarList(){
    this.tipoCambioListComp.actualizarList();
  }

  selectEdit(model:TipoCambio){
    this.tipoCambioFormComp.selectEdit(model);
  }
}

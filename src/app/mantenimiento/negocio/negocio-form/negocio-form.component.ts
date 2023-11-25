import { Component } from '@angular/core';
import { Negocio, NegocioInit } from '../../interface/negocio.interface';

@Component({
  selector: 'app-negocio-form',
  templateUrl: './negocio-form.component.html'
})
export class NegocioFormComponent {
  public model: Negocio = NegocioInit


}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge-estado',
  templateUrl: './badge-estado.component.html'
})
export class BadgeEstadoComponent {
  @Input()
  estado:number=1;
}

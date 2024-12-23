import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
  @Input() tooltipText: string = ''; // Texto del tooltip
  @Input() imgSrc: string = ''; // Fuente de la imagen
  @Output() clickEvent = new EventEmitter<void>(); // Evento para emitir el clic

  onClick() {
    this.clickEvent.emit(); // Emite el evento clic hacia el componente padre
  }
}

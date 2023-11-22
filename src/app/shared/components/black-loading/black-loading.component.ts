import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-black-loading',
  templateUrl: './black-loading.component.html',
  styleUrl: './black-loading.component.css'
})
export class BlackLoadingComponent {
  

  @Input() public show: boolean = false;
  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackLoadingComponent } from './components/black-loading/black-loading.component';



@NgModule({
  declarations: [BlackLoadingComponent],
  imports: [
    CommonModule
  ],
  exports:[BlackLoadingComponent]
})
export class SharedModule { }

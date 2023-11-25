import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackLoadingComponent } from './components/black-loading/black-loading.component';
import { InputControlComponent } from './components/form/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [BlackLoadingComponent, InputControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports:[BlackLoadingComponent, InputControlComponent]
})
export class SharedModule { }

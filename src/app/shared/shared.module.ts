import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackLoadingComponent } from './components/black-loading/black-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { InputControlComponent } from './components/form/input-control/input-control.component';
import { DivCargandoComponent } from './components/div-cargando/div-cargando.component';
import { BadgeEstadoComponent } from './components/badge-estado/badge-estado.component';



@NgModule({
  declarations: [BlackLoadingComponent, Error404PageComponent,InputControlComponent, DivCargandoComponent, BadgeEstadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[BlackLoadingComponent,InputControlComponent,DivCargandoComponent,BadgeEstadoComponent]
})
export class SharedModule { }

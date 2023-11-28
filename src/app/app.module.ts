import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MantenimientoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

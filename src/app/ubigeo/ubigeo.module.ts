import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './pais/pais.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { DistritoComponent } from './distrito/distrito.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PaisFormComponent } from './pais/pais-form/pais-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PaisComponent,
    DepartamentoComponent,
    ProvinciaComponent,
    DistritoComponent,
    PaisListComponent,
    PaisFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class UbigeoModule { }

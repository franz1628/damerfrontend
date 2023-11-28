import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaisComponent } from './components/pais/pais.component';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { SharedModule } from '../../../../shared/shared.module';
import { PaisFormComponent } from './components/pais/pais-form/pais-form.component';
import { PaisListComponent } from './components/pais/pais-list/pais-list.component';
import { BlackLoadingComponent } from '../../../../shared/components/black-loading/black-loading.component';




@NgModule({
  declarations: [
    ProvinciaComponent,
    DistritoComponent,
    PaisComponent,
    PaisFormComponent,
    PaisListComponent,
    DepartamentoComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports : [
  ]
})
export class UbigeoModule { }

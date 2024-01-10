import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributoTecnicoVariedadFormComponent } from './atributo-tecnico-variedad-form/atributo-tecnico-variedad-form.component';
import { AtributoTecnicoVariedadListComponent } from './atributo-tecnico-variedad-list/atributo-tecnico-variedad-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AtributoTecnicoVariedadComponent } from './atributo-tecnico-variedad.component';
import { AtributoTecnicoVariedadRoutingModule } from './atributo-tecnico-variedad-routing.module';
import { AtributoTecnicoVariedadValoresComponent } from './atributo-tecnico-variedad-valores/atributo-tecnico-variedad-valores.component';



@NgModule({
  declarations: [
    AtributoTecnicoVariedadComponent,
    AtributoTecnicoVariedadListComponent,
    AtributoTecnicoVariedadFormComponent,
    AtributoTecnicoVariedadValoresComponent
  ], 
  imports: [
  
    CommonModule,
    FormsModule,
    SharedModule,
    AtributoTecnicoVariedadRoutingModule,
    ReactiveFormsModule
    
  ]
})
export class AtributoTecnicoVariedadModule { }

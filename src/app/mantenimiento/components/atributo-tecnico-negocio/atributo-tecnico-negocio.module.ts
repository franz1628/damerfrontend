import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtributoTecnicoNegocioFormComponent } from './atributo-tecnico-negocio-form/atributo-tecnico-negocio-form.component';
import { AtributoTecnicoNegocioListComponent } from './atributo-tecnico-negocio-list/atributo-tecnico-negocio-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtributoTecnicoNegocioComponent } from './atributo-tecnico-negocio.component';
import { SharedModule } from '../../../shared/shared.module';
import { AtributoTecnicoNegocioRoutingModule } from './atributo-tecnico-negocio-routing.module';



@NgModule({
  declarations: [
    AtributoTecnicoNegocioFormComponent,
    AtributoTecnicoNegocioListComponent,
    AtributoTecnicoNegocioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AtributoTecnicoNegocioRoutingModule
  ]
})
export class AtributoTecnicoNegocioModule { }

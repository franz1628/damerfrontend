import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoComponent } from './contrato.component';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoArbolComponent } from './contrato-arbol/contrato-arbol.component';
import { ContratoEdicionComponent } from './contrato-edicion/contrato-edicion.component';
import { SharedModule } from "../../../shared/shared.module";
import { ContratoEtiquetasComponent } from './contrato-etiquetas/contrato-etiquetas.component';



@NgModule({
    declarations: [
        ContratoComponent,
        ContratoListComponent,
        ContratoFormComponent,
        ContratoArbolComponent,
        ContratoEdicionComponent,
        ContratoEtiquetasComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ContratoRoutingModule,
        SharedModule
    ]
})
export class ContratoModule { }

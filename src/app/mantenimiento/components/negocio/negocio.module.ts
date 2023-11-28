import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NegocioComponent } from './negocio.component';
import { NegocioFormComponent } from './negocio-form/negocio-form.component';
import { NegocioListComponent } from './negocio-list/negocio-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NegocioRoutingModule } from './negocio-routing.module';

@NgModule({
    declarations: [
        NegocioComponent,
        NegocioFormComponent,
        NegocioListComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NegocioRoutingModule
    ]
})
export class NegocioModule { }

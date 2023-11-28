import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametroComponent } from '../parametro/parametro.component';
import { ParametroFormComponent } from '../parametro/parametro-form/parametro-form.component';
import { ParametroListComponent } from '../parametro/parametro-list/parametro-list.component';
import { InputControlComponent } from '../../../shared/components/form/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { TablasRoutingModule } from './tablas-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        TablasRoutingModule,
        
    ]
})
export class TablasModule { }

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
import { TablasComponent } from './tablas.component';
import { LayoutTablasComponent } from './pages/layout-tablas/layout-tablas.component';



@NgModule({
    declarations: [
        
    LayoutTablasComponent,
    TablasComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        TablasRoutingModule,
        BrowserModule
        
    ]
})
export class TablasModule { }

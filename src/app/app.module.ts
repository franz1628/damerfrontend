import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UbigeoModule } from './ubigeo/ubigeo.module';
import { BlackLoadingComponent } from './shared/components/black-loading/black-loading.component';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UbigeoModule,
    MantenimientoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

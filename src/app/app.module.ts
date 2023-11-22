import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NegocioComponent } from './negocio/negocio.component';
import { UbigeoModule } from './ubigeo/ubigeo.module';
import { BlackLoadingComponent } from './shared/components/black-loading/black-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NegocioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UbigeoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackLoadingComponent } from './components/black-loading/black-loading.component';
import { FormsModule } from '@angular/forms';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { InputControlComponent } from './components/form/input-control/input-control.component';



@NgModule({
  declarations: [BlackLoadingComponent, Error404PageComponent,InputControlComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[BlackLoadingComponent,InputControlComponent]
})
export class SharedModule { }

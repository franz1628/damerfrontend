import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariedadesComponent } from './variedades.component';
import { VariedadesRoutingModule } from './variedades-routing.module';
import { CanastaComponent } from './componentes/canasta/canasta.component';
import { MegaCategoriaComponent } from './componentes/mega-categoria/mega-categoria.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { SkuComponent } from './componentes/sku/sku.component';



@NgModule({
  declarations: [
    VariedadesComponent,
    CanastaComponent,
    MegaCategoriaComponent,
    CategoriaComponent,
    SkuComponent
  ],
  imports: [
    CommonModule,
    VariedadesRoutingModule
  ]
})
export class VariedadesModule { }

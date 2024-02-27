import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariedadesComponent } from './variedades.component';
import { VariedadesRoutingModule } from './variedades-routing.module';
import { CanastaComponent } from './componentes/canasta/canasta.component';
import { MegaCategoriaComponent } from './componentes/mega-categoria/mega-categoria.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { SkuComponent } from './componentes/sku/sku.component';
import { CanastaFormComponent } from './componentes/canasta/canasta-form/canasta-form.component';
import { CanastaListComponent } from './componentes/canasta/canasta-list/canasta-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaFormComponent } from './componentes/categoria/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './componentes/categoria/categoria-list/categoria-list.component';
import { MegaCategoriaListComponent } from './componentes/mega-categoria/mega-categoria-list/mega-categoria-list.component';
import { MegaCategoriaFormComponent } from './componentes/mega-categoria/mega-categoria-form/mega-categoria-form.component';
import { SharedModule } from "../../../shared/shared.module";
import { SkuFormComponent } from './componentes/sku/sku-form/sku-form.component';
import { SkuListComponent } from './componentes/sku/sku-list/sku-list.component';
import { CategoriaAtributosComponent } from './componentes/categoria/categoria-atributos/categoria-atributos.component';
import { CategoriaCanalVentaComponent } from './componentes/categoria/categoria-canal-venta/categoria-canal-venta.component';
import { CategoriaExhibidoresComponent } from './componentes/categoria/categoria-exhibidores/categoria-exhibidores.component';
import { SkuAtributosComponent } from './componentes/sku/sku-atributos/sku-atributos.component';
import { SkuUnidadesVentaComponent } from './componentes/sku/sku-unidades-venta/sku-unidades-venta.component';
import { CategoriaValorComponent } from './componentes/categoria/categoria-valor/categoria-valor.component';
import { CategoriaAtributosListComponent } from './componentes/categoria/categoria-atributos/categoria-atributos-list/categoria-atributos-list.component';
import { CategoriaAtributosFormComponent } from './componentes/categoria/categoria-atributos/categoria-atributos-form/categoria-atributos-form.component';
import { CategoriaUnidadVentaComponent } from './componentes/categoria/categoria-unidad-venta/categoria-unidad-venta.component';



@NgModule({
    declarations: [
        VariedadesComponent,
        MegaCategoriaComponent,
        MegaCategoriaListComponent,
        MegaCategoriaFormComponent,
        CategoriaComponent,
        SkuComponent,
        CanastaComponent,
        CanastaFormComponent,
        CanastaListComponent,
        CategoriaFormComponent,
        CategoriaListComponent,
        SkuFormComponent,
        SkuListComponent,
        CategoriaAtributosComponent,
        CategoriaCanalVentaComponent,
        CategoriaExhibidoresComponent,
        SkuAtributosComponent,
        SkuUnidadesVentaComponent,
        CategoriaValorComponent,
        CategoriaAtributosListComponent,
        CategoriaAtributosFormComponent,
        CategoriaUnidadVentaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        VariedadesRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class VariedadesModule { }

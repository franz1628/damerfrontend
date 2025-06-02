import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Canasta, CanastaInit } from './interfaces/canasta.interface';
import { MegaCategoriaFormComponent } from './componentes/mega-categoria/mega-categoria-form/mega-categoria-form.component';
import { CanastaComponent } from './componentes/canasta/canasta.component';
import { MegaCategoriaComponent } from './componentes/mega-categoria/mega-categoria.component';
import { MegaCategoriaListComponent } from './componentes/mega-categoria/mega-categoria-list/mega-categoria-list.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { SkuComponent } from './componentes/sku/sku.component';
import { Categoria } from './interfaces/categoria.interface';
import { CanastaService } from './services/canasta.service';
import { MegaCategoriaService } from './services/megaCategoria.service';
import { Sku } from './interfaces/sku.interface';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-variedades',
  templateUrl: './variedades.component.html' 
})
export class VariedadesComponent{
 
  canasta: Canasta = CanastaInit;
  idCanasta: number = 0; 
  idMegaCategoria: number = 0;
  idCategoria: number = 0; 
  idSku: number = 0; 

  @ViewChild('megaCategoriaComp') megaCategoriaComp!: MegaCategoriaComponent;
  @ViewChild('canastaComp') canastaComp!: CanastaComponent;

  @ViewChild('categoriaComp') categoriaComp!: CategoriaComponent;
  @ViewChild('skuComp') skuComp!: SkuComponent;

  constructor(
    private canastaService: CanastaService,
    private megaCategoriaService : MegaCategoriaService,
    public authService: AuthService
  ){

  }

 

  setIdCanasta(canasta:Canasta){
    this.idCanasta=canasta.id;
    this.authService.canEdit(13) && this.megaCategoriaComp.megaCategoriaForm.setIdCanasta(canasta);
    this.megaCategoriaComp.megaCategoriaList.changeList(canasta);
  }

  changeCanasta($event: number) {
    this.idCanasta = $event;
    this.canastaService.postId(this.idCanasta).subscribe(x=>{
      this.setIdCanasta(x||CanastaInit)
    })
  }


  setIdCanastaMegaCategoria($event:number[]){
    this.idCanasta=$event[0];
    this.idMegaCategoria=$event[1];
    this.categoriaComp.get($event[1]);
    this.authService.canEdit(13) && this.categoriaComp.categoriaForm.setIdCanastaIdMegaCategoria($event[0],$event[1]);
  }

  setByCategoria($event:number[]){
    this.idCanasta=$event[0];
    this.idMegaCategoria=$event[1];
    this.idCategoria=$event[2];
    this.skuComp.get($event[2]); 
    this.authService.canEdit(13) && this.skuComp.skuForm.setByCategoria($event[0],$event[1],$event[2]);
  }

  selectCategoria(categoria : Categoria){
    this.canastaService.postId(categoria.idCanasta).subscribe(resp =>{
      this.canastaComp.editModel(resp);
      this.megaCategoriaService.postId(categoria.idMegaCategoria).subscribe(resp => {
        this.megaCategoriaComp.editModel(resp)
      })
    })
  
  }

  editSku(sku:Sku){

    
    this.idCanasta=sku.idCanasta
    this.idMegaCategoria=sku.idMegaCategoria
    this.idCategoria=sku.idCategoria
    this.idSku=sku.id
  }
}

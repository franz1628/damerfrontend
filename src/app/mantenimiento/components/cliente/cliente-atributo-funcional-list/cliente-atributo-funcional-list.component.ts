import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';

@Component({
  selector: 'app-cliente-atributo-funcional-list',
  templateUrl: './cliente-atributo-funcional-list.component.html'
})
export class ClienteAtributoFuncionalListComponent implements OnInit{
  public models:AtributoFuncionalVariedad[] = [];    
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<AtributoFuncionalVariedad> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit
  @Input() 
  categoria : Categoria = CategoriaInit

  atributoFuncionalVariedad :AtributoFuncionalVariedad = AtributoFuncionalVariedadInit;
 
  constructor(public service : AtributoFuncionalVariedadService, private alert:AlertService){ 
   
     
  }
 
  ngOnInit(): void {

    this.actualizarList(); 
  } 
  
  selectEdit(model:AtributoFuncionalVariedad){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    if(this.cliente.codigo!=0 && this.categoria.codigo!=0){
      this.loading=true;
      this.service.getCodClienteCodCategoria(this.cliente.codigo,this.categoria.codigo).subscribe(resp => {
        console.log(resp.data);
        
        this.models = resp.data;
        this.loading=false;
      })
    }
  }

  borrar(model:AtributoFuncionalVariedad){
    this.alert.showAlertConfirm('Advertencia','¿Desea suspender?','warning',()=>{
      this.service.delete(model).subscribe(x=>{
        this.actualizarList();
      })
    })
  }
}

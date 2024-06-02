import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { AtributoTecnicoVariedadValor } from '../../../interface/atributoTecnicoVariedadValor';
import { Sku } from '../../variedades/interfaces/sku.interface';
import { SkuService } from '../../variedades/services/sku.service';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { AlertService } from '../../../../shared/services/alert.service';
import { ClienteConcatenacionService } from '../../../service/clienteConcatenacion';

@Component({
  selector: 'app-cliente-concatenacion',
  templateUrl: './cliente-concatenacion.component.html'
})
export class ClienteConcatenacionComponent implements OnInit{
  @Input() atributoFuncionalVariedad:AtributoFuncionalVariedad=AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor:AtributoFuncionalVariedadValor=AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = []

  idAtributoTecnicoVariedads:string = ''
  variables:string=''
  separador: string='';


  constructor(    
    private serviceCategoriaAtributoTecnico : CategoriaAtributoTecnicoService,
    private alert: AlertService,
    private serviceClienteConcatenacion:ClienteConcatenacionService
    ){

  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atributoFuncionalVariedadValor']) {
      this.loadModels();
    }

    if (changes['atributoFuncionalVariedad']) {
      this.loadModels();
    }
  }


  loadModels(): void { 


    
    // this.serviceCategoriaAtributoTecnico.postIdCategoria(this.atributoFuncionalVariedad.idCategoria).subscribe(x=>{
    //   this.categoriaAtributoTecnicos = x

    //   this.serviceClienteConcatenacion.postIdAtributoFuncionalVariedadValor(this.atributoFuncionalVariedadValor.id).subscribe(y=>{
    
        
    //     this.idAtributoTecnicoVariedads = y.data.idAtributoTecnicoVariedads;
    //     this.variables = y.data.variables
    //     this.separador = y.data.separador
        
    //   });
    // })
  } 

  get getAtributos(){
    return this.idAtributoTecnicoVariedads.split(',')
  }

  get getVariables(){
    return this.variables.split(',')
  }

  guardar(){
    if(this.idAtributoTecnicoVariedads=='' && this.variables==''){
      this.alert.showAlert('Advertencia','Debe seleccionar al menos un atributo , variable','warning');
      return
    }

   
    
    this.serviceClienteConcatenacion.guardarConcatenacion(this.atributoFuncionalVariedadValor.id,this.idAtributoTecnicoVariedads,this.variables,this.separador).subscribe(x=>{

    }); 

  }

  clickAtributo(atributo: number,e:Event) {
    const checked = (e.target as HTMLInputElement).checked;

    let arrayAtributos:string[] = this.idAtributoTecnicoVariedads!=''?this.idAtributoTecnicoVariedads.split(','):[];
 
    if(checked){
      arrayAtributos.push(atributo.toString())
    }else{
      arrayAtributos = arrayAtributos.filter(item => item !== atributo.toString());
    }

    this.idAtributoTecnicoVariedads = arrayAtributos.join(',');
  
 
  }
    
  clickVariable(atributo: number,e:Event) {
    const checked = (e.target as HTMLInputElement).checked;

    let arrayVariables:string[] = this.variables!=''?this.variables.split(','):[];

    if(checked){
      arrayVariables.push(atributo.toString())
    }else{
      arrayVariables = arrayVariables.filter(item => item !== atributo.toString());
    }

    this.variables = arrayVariables.join(',');
    
    
  }
 
}

import { Component, Input, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { CategoriaAtributoTecnicoValor } from '../../variedades/interfaces/categoriaAtributoTecnicoValor';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';
import { CategoriaAtributoTecnico } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { ClienteFiltroService } from '../../../service/clienteFiltro';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { AtributoTecnicoVariedad } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadValor } from '../../../interface/atributoTecnicoVariedadValor';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { SkuService } from '../../variedades/services/sku.service';
import { Sku } from '../../variedades/interfaces/sku.interface';

@Component({
  selector: 'app-cliente-atributo-filtro',
  templateUrl: './cliente-atributo-filtro.component.html'
})
export class ClienteAtributoFiltroComponent {

  @Input()
  atributoFuncionalVariedadValor :AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit

  @Input() atributoFuncionalVariedad:AtributoFuncionalVariedad=AtributoFuncionalVariedadInit
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = []
  categoriaAtributoTecnicoValors:CategoriaAtributoTecnicoValor[] = []

  atributosTecnicoVariedadValorsEl:AtributoTecnicoVariedadValor[][] = []
  skusEl:Sku[][] = []
  condicion:boolean[] = []

  selectIndex:number=-1
  selectValor:number = 0

  showLoading: boolean = false;
  idCategoriaAtributoTecnico=0;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service : ClienteFiltroService,
    private serviceCategoriaAtributoTecnico:CategoriaAtributoTecnicoService,
    private serviceCategoriaAtributoTecnicoValors : CategoriaAtributoTecnicoValorService,
    private serviceAtributoTecnicoVariedadValor: AtributoTecnicoVariedadValorService,
    private serviceSkuService : SkuService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atributoFuncionalVariedadValor'] && !changes['atributoFuncionalVariedadValor'].firstChange) {
      this.loadModels();
    }

    if (changes['atributoFuncionalVariedad'] && !changes['atributoFuncionalVariedad'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void { 
    this.showLoading = true;


    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.postIdAtributoFuncionalVariedadValor(this.atributoFuncionalVariedadValor.id),
        serviceCategoriaAtributoTecnico: this.serviceCategoriaAtributoTecnico.postIdCategoria(this.atributoFuncionalVariedad.idCategoria),
        serviceSkuService:this.serviceSkuService.getByCategoria(this.atributoFuncionalVariedad.idCategoria),
        serviceAtributoTecnicoVariedadValor:this.serviceAtributoTecnicoVariedadValor.postIdAtributoTecnicoVariedad(this.selectValor)
      }
      ).subscribe({
        next:value => {
          this.categoriaAtributoTecnicos = value.serviceCategoriaAtributoTecnico

          const atributoFuncionales = value.service.data;
         
          
          atributoFuncionales.forEach((model,ind) => {
            if(model.idAtributoTecnicoVariedad!=0){
              this.atributosTecnicoVariedadValorsEl[ind] = value.serviceAtributoTecnicoVariedadValor
            }else{
              this.skusEl[ind] = value.serviceSkuService.data
            }

            if(model.idCondicion==0){
              this.condicion[ind] = false
            }else{
              this.condicion[ind] = true
            }
            
            const nuevoModelo = this.fb.group({
              id: [model.id], 
              idAtributoFuncionalVariedadValor: [model.idAtributoFuncionalVariedadValor],
              valor2 : [model.valor2],
              idClienteTipoValor: [model.idClienteTipoValor], 
              idAtributoTecnicoVariedad: [model.idAtributoTecnicoVariedad], 
              idCondicion: [model.idCondicion],
              valorCondicion:[model.valorCondicion]
            });
  
            this.modelosArray.push(nuevoModelo);


            //agregando combos
            //Carga resultados
          });
   
          if(atributoFuncionales.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })


    
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idAtributoFuncionalVariedadValor: [this.atributoFuncionalVariedadValor.id],
      valor2 : [''],
      idClienteTipoValor: [0], 
      idAtributoTecnicoVariedad: [0], 
      idCondicion: [0],
      valorCondicion: ['']
    });
 
    this.modelosArray.push(nuevoModelo);
  }

  eligeVariable(e: Event,ind:number) {
    const valor = (e.target as HTMLInputElement).value
    this.selectValor = parseInt(valor)
    this.atributosTecnicoVariedadValorsEl[ind] = []

    if(valor=="1"){//SKU 
      this.serviceSkuService.getByCategoria(this.atributoFuncionalVariedad.idCategoria).subscribe(x=>{
        this.skusEl[ind] = x.data
      }) 
    }else if(valor=="2"){//SKU PADRE
      
    }

  }

  eligeAtributo(e: Event,ind:number) {
    const valor = (e.target as HTMLInputElement).value
    this.selectValor = parseInt(valor)
    this.skusEl[ind] = []

    this.serviceAtributoTecnicoVariedadValor.postIdAtributoTecnicoVariedad(this.selectValor).subscribe(x=>{
      this.atributosTecnicoVariedadValorsEl[ind] = x
    })
  }

  cambiarCondicion(e: Event,ind:number) {
    const valor = (e.target as HTMLInputElement).value
    
    if(valor!="0"){

    }
  }


  get getModel() {
    return this.models;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }
 
  editModel(index: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[index].getRawValue();
      //this.atributoFuncionalVariedad = modelo; 
      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    }) 
 
  } 

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex=index
    //this.atributoFuncionalVariedad = modelo; 
  }

  clickAtributo(fila: number,atributo: number,e:Event) {
    const checked = (e.target as HTMLInputElement).checked
    let atributos = ''
    if(this.modelosArray.at(fila).get('valor2')?.value){
      atributos = this.modelosArray.at(fila).get('valor2')?.value
    }

    const arrayAtributos = atributos?atributos.split(','):[];

    if(arrayAtributos.indexOf(atributo.toString())!=-1){
      const indice = arrayAtributos.indexOf(atributo.toString())
      arrayAtributos.splice(indice,1)

    }else{
      arrayAtributos.push(atributo.toString());
    }

    const nuevoValor = arrayAtributos.join(',');

    this.modelosArray.at(fila).value.valor2 = nuevoValor
  }
    
  clickVariable(fila: number,atributo: number,e:Event) {
    const checked = (e.target as HTMLInputElement).checked
    let atributos = ''
   
    
    if(this.modelosArray.at(fila).get('valor2')?.value!=''){
      atributos = this.modelosArray.at(fila).get('valor2')?.value
    }
    
    
    let arrayAtributos = atributos!=''?atributos.split(','):[];
 
   
    

    if(arrayAtributos.indexOf(atributo.toString())!=-1){
      const indice = arrayAtributos.indexOf(atributo.toString())
      arrayAtributos.splice(indice,1)

    }else{
      arrayAtributos.push(atributo.toString());
    }
   
   
    const nuevoValor = arrayAtributos.join(',');

    this.modelosArray.at(fila).patchValue({'valor2':nuevoValor})
    
    
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
   

    this.showLoading = true;

    try {
      await lastValueFrom(this.service.add(modelo));
      this.alert.showAlert('Mensaje', 'Agregado correctamente', 'success');
      this.loadModels();
      this.showLoading = false;
    } catch (error) {
      this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
      this.showLoading = false;
    }
  }

  async delete(num: number) {
    this.alert.showAlertConfirm('Advertencia', '¿Está seguro de eliminar?', 'warning', async () => {
      const modelo = this.modelosArray.at(num).value;
      this.showLoading = true;

      try {
        await lastValueFrom(this.service.delete(modelo));
        this.alert.showAlert('Mensaje', 'Eliminado correctamente', 'success');
        this.loadModels();
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }


}

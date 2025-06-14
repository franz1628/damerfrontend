import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Categoria, CategoriaInit } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaAtributoTecnicoService } from '../../../services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../../interfaces/categoriaAtributoTecnico';
import { CategoriaAtributosListComponent } from './categoria-atributos-list/categoria-atributos-list.component';
import { CategoriaAtributosFormComponent } from './categoria-atributos-form/categoria-atributos-form.component';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { Observable, debounceTime, forkJoin, lastValueFrom } from 'rxjs';
import { AtributoTecnicoVariedadService } from '../../../../../service/atributoTecnicoVariedad';
import { AtributoTecnicoVariedad } from '../../../../../interface/atributoTecnicoVariedad';
import { TipoUnidadMedidaService } from '../../../../../service/tipoUnidadMedida';
import { TipoUnidadMedida } from '../../../../../interface/tipoUnidadMedida';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-categoria-atributos',
  templateUrl: './categoria-atributos.component.html'
})
export class CategoriaAtributosComponent implements OnInit{

  @Input()
  modelCategoria: Categoria = CategoriaInit
  showLoading: boolean = false;
  idCategoriaAtributoTecnico=0;
  categoriaAtributoTecnico:CategoriaAtributoTecnico=CategoriaAtributoTecnicoInit;
  atributoTecnicoVariedads:AtributoTecnicoVariedad[] = [];
  tipoUnidadMedidas:TipoUnidadMedida[] = []
  selectIndex:number=-1
  repeAtri:AtributoTecnicoVariedad[] = []

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: CategoriaAtributoTecnicoService,
    private serviceAtributoTecnicoVariedadService : AtributoTecnicoVariedadService,
    private serviceTipoUnidadMedida:TipoUnidadMedidaService,
    private serviceCategoria: CategoriaService,
    private fb: FormBuilder,
    private alert: AlertService,
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.serviceTipoUnidadMedida.get().subscribe(x=>{
      this.tipoUnidadMedidas = x.data
    })
    //this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelCategoria']) {
      this.loadModels();

      if(this.modelCategoria.idTipoCategoria!=1){
        let repetidos:number[] = []
        this.repeAtri = []
        this.serviceCategoria.getCategorias(this.modelCategoria.idCategorias).subscribe(x=>{
          const cates = x.data.map(y=>y.CategoriaAtributoTecnico)
          let arrRe:number[] = []

          cates.forEach(z => {
            const arr =z.forEach(a=>{
              if(arrRe.some(b=>b==a.idAtributoTecnicoVariedad) && !repetidos.some(b=>b==a.idAtributoTecnicoVariedad)){
                repetidos.push(a.idAtributoTecnicoVariedad)
                this.repeAtri.push(a.AtributoTecnicoVariedad)
              }else{
                arrRe.push(a.idAtributoTecnicoVariedad)
              }
            })
            
            
          })
        }
        
        
      )}
    }
  } 

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.postIdCategoria(this.modelCategoria.id),
        serviceAtributoTecnicoVariedadService : this.serviceAtributoTecnicoVariedadService.get()
      }
      ).subscribe({
        next:value => {
          this.atributoTecnicoVariedads = value.serviceAtributoTecnicoVariedadService.data

          const models = value.service.data
          console.log(models);
          
          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria: [model.idCategoria],
              idAtributoTecnicoVariedad: [model.idAtributoTecnicoVariedad], 
              AtributoTecnicoVariedad: [model.AtributoTecnicoVariedad], 
              comentario: [model.comentario],
              idTipoUnidadMedida: [model.idTipoUnidadMedida],
              numOrdenSku: [model.numOrdenSku],
              indVerificado: [model.indVerificado],
              estado: [model.estado]
            });
            this.modelosArray.push(nuevoModelo);
          });
  
          if(models.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })


    if (this.modelCategoria.id !== 0) {
      this.service.postIdCategoria(this.modelCategoria.id).subscribe(models => {
        
      });
    }
  }



  get getModel() {
    return this.modelCategoria;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num: number) {
    const modelo = this.modelosArray.controls[num].getRawValue();

    if(!this.validacionCategoriaAtributo(modelo,num)) return

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    this.selectIndex=index
    this.categoriaAtributoTecnico = (this.models.get('modelos') as FormArray).at(index).value;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCategoria: [this.modelCategoria.id],
      idAtributoTecnicoVariedad: [0],
      comentario: [''],
      idTipoUnidadMedida: [0],
      numOrdenSku: [0],
      indVerificado: [0],
      estado: [1]
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;

    if(!this.validacionCategoriaAtributo(modelo,num)) return

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

  validacionCategoriaAtributo(modelo:CategoriaAtributoTecnico,num:number):boolean{
    if(modelo.idAtributoTecnicoVariedad==0) {
      this.alert.showAlert('Advertencia', 'Debe elegir un atributo tecnico', 'warning');
      return false
    }

    if(modelo.AtributoTecnicoVariedad?.solicitarUnidad==1 && modelo.idTipoUnidadMedida==0){
      this.alert.showAlert('Advertencia', 'Debe elegir la unidad de medida', 'warning');
      return false
    }

    const modelos:CategoriaAtributoTecnico[] = this.modelosArray.value;
    if(modelos.some((x,key)=>key!=num && x.idTipoUnidadMedida==modelo.idTipoUnidadMedida && x.idAtributoTecnicoVariedad == modelo.idAtributoTecnicoVariedad)){
      this.alert.showAlert('Advertencia', 'No puede haber atributos y tipos duplicados', 'warning');
      return false
    } 

    return true
  
  }

  async delete(num: number) {
    this.alert.showAlertConfirm('Advertencia', '¿Está seguro de eliminar?', 'warning', async () => {
      const modelo = this.modelosArray.at(num).value;
      this.showLoading = true;

      try {
        const response = await lastValueFrom(this.service.delete(modelo));

        if(response.state==1){
          this.alert.showAlert('Mensaje', 'Eliminado correctamente', 'success');
          this.loadModels();
        }else{
          this.alert.showAlert('Advertencia', response.message, 'warning');
        }
      
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }
 

}

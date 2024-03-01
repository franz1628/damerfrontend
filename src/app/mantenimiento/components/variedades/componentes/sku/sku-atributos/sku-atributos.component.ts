import { Component, Input, SimpleChanges } from '@angular/core';
import { Sku, SkuInit } from '../../../interfaces/sku.interface';
import { TipoUnidadMedida } from '../../../../../interface/tipoUnidadMedida';
import { UnidadMedida } from '../../../../../interface/unidadMedida';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AtributoTecnicoVariedadService } from '../../../../../service/atributoTecnicoVariedad';
import { TipoUnidadMedidaService } from '../../../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../../../service/unidadMedida';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { SkuAtributoTecnicoVariedadValor } from '../../../../../interface/skuAtributoTecnicoVariedadValor';
import { SkuAtributoTecnicoVariedadValorService } from '../../../../../service/skuAtributoTecnicoVariedadValor';
import { AtributoTecnicoVariedad } from '../../../../../interface/atributoTecnicoVariedad';
import { CategoriaAtributoTecnicoService } from '../../../services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico } from '../../../interfaces/categoriaAtributoTecnico';

@Component({
  selector: 'app-sku-atributos',
  templateUrl: './sku-atributos.component.html'
})
export class SkuAtributosComponent {

  @Input()
  modelSku: Sku = SkuInit
  showLoading: boolean = false;
  tipoUnidadMedidas:TipoUnidadMedida[] = [];
  unidadMedidas:UnidadMedida[] = [];
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = [];

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: SkuAtributoTecnicoVariedadValorService,
    private serviceCategoriaAtributoTecnico : CategoriaAtributoTecnicoService,
    private serviceTipoUnidadMedida : TipoUnidadMedidaService,
    private serviceUnidadMedida:UnidadMedidaService,
    private fb: FormBuilder,
    private alert: AlertService
    
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelSku'] && !changes['modelSku'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();
 
   
    forkJoin( 
      {
        service  : this.service.postIdSku(this.modelSku.id),
        serviceCategoriaAtributoTecnico : this.serviceCategoriaAtributoTecnico.postIdCategoria(this.modelSku.idCategoria),
        serviceTipoUnidadMedida : this.serviceTipoUnidadMedida.get(),
        serviceUnidadMedida : this.serviceUnidadMedida.get(),
      }
      ).subscribe({
        next:value => {

         


          
          this.categoriaAtributoTecnicos = value.serviceCategoriaAtributoTecnico
          this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
          this.unidadMedidas = value.serviceUnidadMedida.data

          const atributosValorGuardados = value.service.data;

          const models = value.serviceCategoriaAtributoTecnico


          models.forEach(model => {

            const atributoVariedad = atributosValorGuardados.find(x=>x.idAtributoTecnicoVariedad == model.idAtributoTecnicoVariedad);

            const nuevoModelo = this.fb.group({
              id: [atributoVariedad?.id||0],
              idSku:[this.modelSku.id],
              idAtributoTecnicoVariedad:[model.idAtributoTecnicoVariedad],
              idAtributoTecnicoVariedadValor:[atributoVariedad?.idAtributoTecnicoVariedadValor||0],
              comentario:[atributoVariedad?.comentario||''],
              idTipoUnidadMedida:[model.idTipoUnidadMedida],
              idUnidadMedida:[atributoVariedad?.idUnidadMedida||0],
              alias1:[atributoVariedad?.alias1||''],
              alias2:[atributoVariedad?.alias2||''],
              alias3:[atributoVariedad?.alias3||''],
            });
  
            this.modelosArray.push(nuevoModelo);
          });
  
          if(models.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })

  }



  get getModel() {
    return this.modelSku;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  getAtributos(idAtributoTecnicoVariedad:number){
    return this.categoriaAtributoTecnicos.filter(x=>x.idAtributoTecnicoVariedad == idAtributoTecnicoVariedad)[0].AtributoTecnicoVariedad.descripcion
  }

  getAtributosValor(idAtributoTecnicoVariedad:number){
    const atr:AtributoTecnicoVariedad =  this.categoriaAtributoTecnicos.filter(x=>x.idAtributoTecnicoVariedad == idAtributoTecnicoVariedad)[0].AtributoTecnicoVariedad;
    return atr.AtributoTecnicoVariedadValor
  }

  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idSku:[this.modelSku.id],
      idAtributoTecnicoVariedad:[''],
      idAtributoTecnicoVariedadValor:[0],
      comentario:[''],
      idTipoUnidadMedida:[''],
      idUnidadMedida:[0],
      alias1:[''],
      alias2:[''],
      alias3:[''],
    });

    this.modelosArray.push(nuevoModelo);
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

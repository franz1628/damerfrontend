import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadValorService } from '../../../service/atributoFuncionalVariedadValor';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';

@Component({
  selector: 'app-cliente-atributo-valor',
  templateUrl: './cliente-atributo-valor.component.html'
})
export class ClienteAtributoValorComponent {
  @Output() emitAtributoFuncionalVariedadValor:EventEmitter<AtributoFuncionalVariedadValor> = new EventEmitter()
  @Input()
  atributoFuncionalVariedad: AtributoFuncionalVariedad = AtributoFuncionalVariedadInit
  selectIndex:number=-1
  showLoading: boolean = false;
  atributoFuncionalVariedadValor:AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit 

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: AtributoFuncionalVariedadValorService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    
    if (changes['atributoFuncionalVariedad'] && !changes['atributoFuncionalVariedad'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.postIdAtributoFuncionalVariedad(this.atributoFuncionalVariedad.id)
      }
      ).subscribe({
        next:value => {
         
          const models = value.service.data;
          console.log(models);
          

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idAtributoFuncionalVariedad: [this.atributoFuncionalVariedad.id],
              descripcion: [model.descripcion],
              alerta: [model.alerta],
              idTipoAtributoFuncionalVariedadValor: [model.idTipoAtributoFuncionalVariedadValor.toString()],
              condicion: [model.condicion],
              formula: [model.formula],
              nSkus: [model.nSkus],
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
    return this.atributoFuncionalVariedad;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num: number) {
    
    const modelo = this.modelosArray.controls[num].getRawValue();

    if(modelo.descripcion==""){
      this.alert.showAlert('Advertencia', 'Debe tener una descripción', 'warning');
      return;
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();
 
      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  elegir(model:AtributoFuncionalVariedadValor,index: number) {
    this.selectIndex=index
    this.atributoFuncionalVariedadValor = model
    this.emitAtributoFuncionalVariedadValor.emit(model)

    
  }


  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idAtributoFuncionalVariedad: [this.atributoFuncionalVariedad.id],
      descripcion: [''],
      alerta: [0],
      idTipoAtributoFuncionalVariedadValor: [0],
      condicion: [''],
      formula: [''],
      nSkus: [0],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    
    const modelo = this.modelosArray.controls[num].getRawValue();

    if(modelo.descripcion==""){
      this.alert.showAlert('Advertencia', 'Debe tener una descripción', 'warning');
      return;
    }
    
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

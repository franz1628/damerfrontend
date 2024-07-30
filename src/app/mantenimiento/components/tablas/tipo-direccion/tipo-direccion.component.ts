import { Component, Input, SimpleChanges } from '@angular/core';
import { TipoDireccion, TipoDireccionInit } from '../../variedades/interfaces/tipoDireccion';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TipoDireccionService } from '../../../service/tipoDireccion';
import { AlertService } from '../../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tipo-direccion',
  templateUrl: './tipo-direccion.component.html'
})
export class TipoDireccionComponent {
  @Input()
  modelTipoDireccion: TipoDireccion = TipoDireccionInit
  showLoading: boolean = false;
  tipoDireccion :TipoDireccion = TipoDireccionInit

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: TipoDireccionService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !changes['model'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.get()
      }
      ).subscribe({
        next:value => {
          const models = value.service.data;

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              descripcion:[model.descripcion],
              alias1:[model.alias1],
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

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    this.tipoDireccion = (this.models.get('modelos') as FormArray).at(index).value;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      descripcion:[''],
      descripcionResumida:[''],
      tip:[''],
      formaUso:[0],
      idTipoUnidadMedida:[0],
      unidadMedida:[0],
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

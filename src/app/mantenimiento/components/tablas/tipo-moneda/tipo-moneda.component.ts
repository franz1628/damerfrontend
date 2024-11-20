import { Component, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TipoMonedaService } from '../../../service/tipoMoneda';
import { AlertService } from '../../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tipo-moneda',
  templateUrl: './tipo-moneda.component.html'
})
export class TipoMonedaComponent {
  @Input()
  showLoading: boolean = false;
  
  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  constructor(
    private service: TipoMonedaService,
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
          console.log('hg');
          
          const models = value.service.data;

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id], 
              descripcion:[model.descripcion],
              simbolo:[model.simbolo],
              alias:[model.alias],
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
    const modelo = this.modelosArray.controls[num].getRawValue();

    if(modelo.descripcion.trim()==''){
      this.alert.showAlert('Advertencia', 'Debe tener una descripcion', 'warning');
      return;
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      this.service.update(modelo.id, modelo).subscribe(x => {
        this.loadModels();
        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      descripcion:[''],
      simbolo:[''],
      alias:[''],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
    this.showLoading = true;

    if(modelo.descripcion.trim()==''){
      this.alert.showAlert('Advertencia', 'Debe tener una descripcion', 'warning');
      return;
    }

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

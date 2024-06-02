import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, lastValueFrom } from 'rxjs';
 
@Component({ 
  selector: 'app-atributo-tecnico-variedad-form',
  templateUrl: './atributo-tecnico-variedad-form.component.html'
})
export class AtributoTecnicoVariedadFormComponent {
 
  @Input()
  modelAtributoTecnicoVariedad: AtributoTecnicoVariedad = AtributoTecnicoVariedadInit
  showLoading: boolean = false;

  @Output() modelElegidoEmit:EventEmitter<AtributoTecnicoVariedad> = new EventEmitter();

  atributoTecnicoVariedad:AtributoTecnicoVariedad = AtributoTecnicoVariedadInit;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  constructor(
    private service: AtributoTecnicoVariedadService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.get(),
      }
      ).subscribe({
        next:value => {

          const models = value.service.data;
         

          models.forEach((model,index) => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              descripcion:[model.descripcion],
              solicitarUnidad:[model.solicitarUnidad],
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
    this.atributoTecnicoVariedad = (this.models.get('modelos') as FormArray).at(index).value;

    this.modelElegidoEmit.emit(this.atributoTecnicoVariedad)
  }

  add() {
    const nuevoModelo = this.fb.group({
        id: [0],
        descripcion:[''],
        solicitarUnidad:[0],
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

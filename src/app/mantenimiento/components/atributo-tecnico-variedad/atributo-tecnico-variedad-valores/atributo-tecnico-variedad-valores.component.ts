import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { AtributoTecnicoVariedadValor, AtributoTecnicoVariedadValorInit } from '../../../interface/atributoTecnicoVariedadValor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-atributo-tecnico-variedad-valores',
  templateUrl: './atributo-tecnico-variedad-valores.component.html'
})
export class AtributoTecnicoVariedadValoresComponent implements OnInit, OnChanges {
  @Input()
  modelAtributoTecnicoVariedad: AtributoTecnicoVariedad = AtributoTecnicoVariedadInit
  showLoading: boolean = false;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: AtributoTecnicoVariedadValorService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelAtributoTecnicoVariedad'] && !changes['modelAtributoTecnicoVariedad'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();
    if (this.modelAtributoTecnicoVariedad.id !== 0) {
      this.service.postIdAtributoTecnicoVariedad(this.modelAtributoTecnicoVariedad.id).subscribe(models => {
        models.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idAtributoTecnicoVariedad: [model.idAtributoTecnicoVariedad],
            valor: [model.valor, Validators.required],
            comentario: [model.comentario],
            alias1: [model.alias1],
            idConvenio: [model.idConvenio],
            estado: [model.estado]
          });
          this.modelosArray.push(nuevoModelo);
        });

        if(models.length==0){
          this.add();
        }

        this.showLoading = false;
      });
    }
  }

  get getModel() {
    return this.modelAtributoTecnicoVariedad;
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

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idAtributoTecnicoVariedad: [this.modelAtributoTecnicoVariedad.id],
      valor: ['', Validators.required],
      comentario: [''],
      alias1: [''],
      idConvenio: [1],
      estado: [1]
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

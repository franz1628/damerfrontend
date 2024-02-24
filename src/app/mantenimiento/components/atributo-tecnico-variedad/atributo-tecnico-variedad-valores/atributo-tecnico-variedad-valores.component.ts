import { Component, Input, OnInit } from '@angular/core';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { AtributoTecnicoVariedadValor, AtributoTecnicoVariedadValorInit } from '../../../interface/atributoTecnicoVariedadValor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-atributo-tecnico-variedad-valores',
  templateUrl: './atributo-tecnico-variedad-valores.component.html'
})
export class AtributoTecnicoVariedadValoresComponent implements OnInit {
  @Input()
  modelAtributoTecnicoVariedad: AtributoTecnicoVariedad = AtributoTecnicoVariedadInit

  models!: FormGroup;
  idAtributoTecnicoVariedad:number=0;

  constructor(
    private service: AtributoTecnicoVariedadValorService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    //this.cargaModels();

  }

  cargaModels(idAtributoTecnicoVariedad: number) {
    this.idAtributoTecnicoVariedad = idAtributoTecnicoVariedad;
    this.models = this.fb.group({
      modelos: this.fb.array([]),
    });

    if (idAtributoTecnicoVariedad != 0) {
      this.service.postIdAtributoTecnicoVariedad(idAtributoTecnicoVariedad).subscribe(x => {

        x.forEach(y => {
          const nuevoModelo = this.fb.group({
            id: [y.id],
            idAtributoTecnicoVariedad: [y.idAtributoTecnicoVariedad],
            valor: [y.valor, Validators.required],
            comentario: [y.comentario],
            alias1: [y.alias1],
            idConvenio: [y.idConvenio],
            estado: [y.estado]
          });

          this.modelosArray.push(nuevoModelo);

        })
      });
    }
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

  save(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea agregar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.add(modelo).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Agregado correctamente', 'success');
        this.cargaModels(this.idAtributoTecnicoVariedad);
      });
    });

  }


}

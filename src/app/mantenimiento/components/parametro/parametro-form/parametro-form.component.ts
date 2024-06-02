import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Parametro, ParametroInit } from '../../../interface/parametro.interface';
import { AlertService } from '../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ParametroService } from '../../../service/parametro.service';
import { ClasificadoReferenciaService } from '../../../service/clasificadoReferencia';
import { ClasificadoReferencia } from '../../../interface/clasificadoReferencia';


@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
})
export class ParametroFormComponent {
  @Input()
  public model: Parametro = ParametroInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    idClasificadoReferencia: [0],
    valorParametro1: [0],
    valorParametro2: [0],
    valorParametro3: [0],
    inicioVigencia: [new Date()],
    alias1: [''],
    alias2: [''],
    alias3: ['']

  })

  public clasificadoReferencias: ClasificadoReferencia[] = [];

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ParametroService,
    private serviceClasificadoReferencia: ClasificadoReferenciaService
  ) {

  }

  ngOnInit() {
    this.showLoading = true;
    this.serviceClasificadoReferencia.get().subscribe(x => {
      this.clasificadoReferencias = x.data;
    })

  }

  get currentModel() {

    return this.myForm.value as Parametro;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.patchValue({
      descripcionResumida: this.myForm.get('descripcion')?.value,
      tip: this.myForm.get('descripcion')?.value,
    }) 

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(ParametroInit);
        this.myForm.clearValidators()
        this.myForm.reset()
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.reset()
      });
    }
  }

  setModel(model: Parametro) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(ParametroInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

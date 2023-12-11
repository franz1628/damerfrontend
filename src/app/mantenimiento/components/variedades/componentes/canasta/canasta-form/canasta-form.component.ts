import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Canasta, CanastaInit } from '../../../interfaces/canasta.interface';
import { CanastaService } from '../../../services/canasta.service';
import { ValidFormService } from '../../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../../shared/services/alert.service';

@Component({
  selector: 'app-canasta-form',
  templateUrl: './canasta-form.component.html'
})
export class CanastaFormComponent {
  @Input()
  public model: Canasta = CanastaInit;
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    codigo: [0, Validators.required],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    especificarAltura: [0],
    especificarAnchura: [0],
    especificarProfundidad: [0],
    especificarModelo: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],

  })

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: CanastaService
    ) {
  }

  ngOnInit() {
    this.showLoading = true
  }

  get currentModel() {
    return this.myForm.value as Canasta;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(CanastaInit);
        this.myForm.clearValidators();
        this.myForm.reset();
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: Canasta) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(CanastaInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

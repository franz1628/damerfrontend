import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Provincia, ProvinciaInit } from '../../../interface/provincia.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { DepartamentoService } from '../../../service/departamento.service';
import { ProvinciaService } from '../../../service/provincia.service';
import { Departamento } from '../../../interface/departamento.interface';
import { catchError, of, throwError } from 'rxjs';


@Component({
  selector: 'app-provincia-form',
  templateUrl: './provincia-form.component.html'
})
export class ProvinciaFormComponent {
  @Input()
  public model: Provincia = ProvinciaInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    idDepartamento: ['', Validators.required],
    estado: [1]
  })

  public listDepartamentos: Departamento[] = [];

  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: ProvinciaService, public departamentoService: DepartamentoService) {

  }

  ngOnInit() {
    this.showLoading = true
    this.departamentoService.get().subscribe(response => { this.showLoading = false; this.listDepartamentos = response.data });
  }

  get currentModel() {

    return this.myForm.value as Provincia;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel)
        .pipe(catchError(val => of(undefined)))
        .subscribe(res => {
          console.log(res);
          
          if(res){
            this.showLoading = false;
            this.updateModelsEmit.emit();
            this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
          }
        });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: Provincia) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(ProvinciaInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

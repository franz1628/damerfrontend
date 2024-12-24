import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Distrito, DistritoInit } from '../../../interface/distrito.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provincia } from '../../../interface/provincia.interface';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { DistritoService } from '../../../service/distrito.service';
import { ProvinciaService } from '../../../service/provincia.service';

@Component({
  selector: 'app-distrito-form',
  templateUrl: './distrito-form.component.html'
})
export class DistritoFormComponent {
  @Input()
  public model: Distrito = DistritoInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo:[0],
    descripcion: ['', Validators.required],
    idProvincia: [''],
    estado: [1]
  })

  public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: DistritoService, public provinciaService: ProvinciaService) {

  }

  ngOnInit(){
    this.showLoading = true
    this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as Distrito;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if(!this.currentModel.id){
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(DistritoInit);
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.patchValue(DistritoInit);
      });
    }
  }

  setModel(model: Distrito) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(DistritoInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

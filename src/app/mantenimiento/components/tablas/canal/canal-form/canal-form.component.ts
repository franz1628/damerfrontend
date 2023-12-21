import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Canal, CanalInit } from '../../interfaces/canal.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanalService } from '../../service/canal.sevice';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-canal-form',
  templateUrl: './canal-form.component.html'
})
export class CanalFormComponent {
  @Input()
  public model: Canal = CanalInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo:  [0, [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    factorRecargo: [0],
    avancePermNego: [0],
    avancePermProsp: [0],
    tieneExhibidor: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
 
  })

  //public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: CanalService) {

  }

  ngOnInit(){
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as Canal;
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
        this.myForm.patchValue(CanalInit);
        this.myForm.clearValidators()
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: Canal) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(CanalInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

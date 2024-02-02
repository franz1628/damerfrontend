import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../../../interfaces/categoriaAtributoTecnico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { CategoriaAtributoTecnicoService } from '../../../../services/categoriaAtributoTecnico.service';

@Component({
  selector: 'app-categoria-atributos-form',
  templateUrl: './categoria-atributos-form.component.html'
})
export class CategoriaAtributosFormComponent {
  @Input()
  public model: CategoriaAtributoTecnico = CategoriaAtributoTecnicoInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo: [0, [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]],
    descripcion:  ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    claseInforme: [0],
    estudios: [0],
    variables: [0],
    unidades: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  //public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: CategoriaAtributoTecnicoService) {

  }

  ngOnInit(){
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as CategoriaAtributoTecnico;
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
        this.myForm.patchValue(CategoriaAtributoTecnicoInit);
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

  setModel(model: CategoriaAtributoTecnico) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(CategoriaAtributoTecnicoInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

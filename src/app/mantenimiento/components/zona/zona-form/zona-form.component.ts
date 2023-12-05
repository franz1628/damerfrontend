import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ZonaService } from '../../tablas/service/zona.service';
import { TipoZonaService } from '../../../service/tipoZona.service';
import { TipoZona } from '../../../interface/tipoZona';

@Component({
  selector: 'app-zona-form',
  templateUrl: './zona-form.component.html'
})
export class ZonaFormComponent {
  @Input()
  public model: Zona = ZonaInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo:[0, Validators.required],
    idTipoZona:[0, Validators.required],
    descripcion: ['', Validators.required],
    numeroOrden: [0, Validators.required],
    alias1: [''],
    alias2: [''],
    alias3: [''],
 
  })

  public listTipoZona : TipoZona[] = [];
  
  constructor(
    public alert: AlertService, 
    public fb: FormBuilder, 
    public validForm: ValidFormService, 
    private service: ZonaService, 
    private serviceTipoZona:TipoZonaService) {

  }

  ngOnInit(){
    this.showLoading = true
    this.serviceTipoZona.get().subscribe(response => { this.showLoading = false; this.listTipoZona = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as Zona;
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
        this.myForm.patchValue(ZonaInit);
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

  setModel(model: Zona) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(ZonaInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

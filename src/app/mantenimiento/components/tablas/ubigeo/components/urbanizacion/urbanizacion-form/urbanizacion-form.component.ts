import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Urbanizacion, UrbanizacionInit } from '../../../../interfaces/urbanizacion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { UrbanizacionService } from '../../../../service/urbanizacion.service';
import { DistritoService } from '../../../service/distrito.service';
import { ProvinciaService } from '../../../service/provincia.service';
import { DepartamentoService } from '../../../service/departamento.service';
import { Departamento } from '../../../interface/departamento.interface';
import { Provincia } from '../../../interface/provincia.interface';
import { Distrito } from '../../../interface/distrito.interface';

@Component({
  selector: 'app-urbanizacion-form',
  templateUrl: './urbanizacion-form.component.html'
})
export class UrbanizacionFormComponent implements OnInit{
  @Input()
  public model: Urbanizacion = UrbanizacionInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    idPais: [1004],
    idDepartamento:[0],
    idProvincia:[0],
    idDistrito:[0]
  })

  departamentos:Departamento[] = []
  provincias:Provincia[] = []
  distritos:Distrito[] = []
  
  constructor(
    private alert: AlertService, 
    private fb: FormBuilder, 
    private validForm: ValidFormService,
    private service: UrbanizacionService,
    private serviceDistrito:DistritoService,
    private serviceProvincia:ProvinciaService,
    private serviceDepartamento: DepartamentoService
    ) {}
  
    ngOnInit(): void {
      this.serviceDistrito.get().subscribe(response => { this.showLoading = false; this.distritos = response.data });
      this.serviceProvincia.get().subscribe(response => { this.showLoading = false; this.provincias = response.data });
      this.serviceDepartamento.get().subscribe(response => { this.showLoading = false; this.departamentos = response.data });
    }
  

  get currentModel() {
    return this.myForm.value as Urbanizacion;
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
        this.myForm.reset()
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.reset()
      });
    }
  }

  get getProvincias(){
    return this.provincias.filter(x=>x.idDepartamento==this.myForm.value.idDepartamento);
  }

  get getDistritos(){
    return this.distritos.filter(x=>x.idProvincia==this.myForm.value.idProvincia);
  }


  setModel(model: Urbanizacion) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(UrbanizacionInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Distrito, DistritoInit } from '../../../interface/distrito.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provincia, ProvinciaInit } from '../../../interface/provincia.interface';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { DistritoService } from '../../../service/distrito.service';
import { ProvinciaService } from '../../../service/provincia.service';
import { Departamento } from '../../../interface/departamento.interface';
import { DepartamentoService } from '../../../service/departamento.service';
import { ZonaInit } from '../../../../interfaces/zona.interface';

@Component({
  selector: 'app-distrito-form',
  templateUrl: './distrito-form.component.html'
})
export class DistritoFormComponent {
  @Input()
  model: Distrito = DistritoInit
  showLoading: boolean = false;

  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    idDepartamento: ['0'],
    idProvincia: ['0'],
    idZona: ['0'],
    estado: [1]
  })

  listProvincia : Provincia[] = [];
  listDepartamento : Departamento[] = [];
  
  constructor(
    private alert: AlertService, 
    private fb: FormBuilder, 
    private validForm: ValidFormService, 
    private service: DistritoService, 
    private provinciaService: ProvinciaService,
    private departamentoService:DepartamentoService)
    {

  }

  ngOnInit(){
    this.showLoading = true
    this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
    this.departamentoService.get().subscribe(x=>{this.showLoading = false; this.listDepartamento=x.data})
  }
  
  get currentModel() {
    
    return this.myForm.value as Distrito;
  }

  get listPorDepartamento(){
    const idDepartamento = this.myForm.get('idDepartamento')?.value

    return this.listProvincia.filter(x=>x.idDepartamento == idDepartamento);
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if(!this.currentModel.id){
      this.service.add(this.currentModel).subscribe((x) => {
        if(x.state==1){
          this.showLoading = false;
          this.updateModelsEmit.emit();
          this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
          this.myForm.patchValue({idDepartamento:0});
          this.myForm.patchValue(DistritoInit);
        }else{
          this.alert.showAlert('¡Mensaje!', x.message, 'warning');
        }
      });
    }else{
      
      

      const model = {
        id : this.currentModel.id,
        descripcion : this.currentModel.descripcion,
        idProvincia : this.currentModel.idProvincia,
        estado : this.currentModel.estado,
        idZona : this.currentModel.idZona,
      
      } as Distrito;

      console.log(model);
      this.service.update(this.currentModel.id,model).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.patchValue({idDepartamento:0});
        this.myForm.patchValue(DistritoInit);
      });
    }
  }

  setModel(model: Distrito) {
    const idDepartamento = model.Provincia.idDepartamento;
    this.myForm.patchValue({idDepartamento})
    
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

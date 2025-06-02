import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../shared/services/validForm.service';
import { Medicion } from '../../interface/medicion';
import { MedicionService } from '../../service/medicion.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.component.html'
})
export class MedicionComponent implements OnInit{

  models:Medicion[] = []

  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    anio: [2024, [Validators.required,Validators.min(2010),Validators.max(2050), Validators.pattern(/^-?\d+$/)]],
    mes: [1, [Validators.required,Validators.min(1),Validators.max(12), Validators.pattern(/^-?\d+$/)]],
    codPais:[1],
    medicion: [''],
  })

  constructor( 
    public alert: AlertService,
    public fb: FormBuilder, 
    public validForm: ValidFormService,
    private medicionService : MedicionService,
    public authService : AuthService
    ){

  }

  ngOnInit(): void {
    this.loadModels()
  }

  loadModels(){
    this.medicionService.get().subscribe(x=>{
      this.models = x.data
    })  
  }

  get currentModel() {
    return this.myForm.value as Medicion;
  }

  get getMedicion():number|string{
    const anio:number = parseInt(this.myForm.get('anio')?.value);
    const mes:number = parseInt(this.myForm.get('mes')?.value);
    if (this.myForm.valid) {
      this.myForm.patchValue({medicion:(anio%100)*100 + mes});
      return (anio%100)*100 + mes;
    }
    return '-';
  }

  agregarMedicion(){

    this.medicionService.nextMedicion().subscribe((resp)=>{ 
      const nextMedicion = resp.data.medicion;

      this.alert.showAlertConfirm('Advertencia','¿Desea agregar la medicion : ' + nextMedicion +' ? ','warning',()=>{
        this.medicionService.add(this.currentModel).subscribe((resp)=>{
          if(resp.status == 1){
            this.loadModels()
            this.alert.showAlert('Mensaje','Se aperturo la medicion correctamente','success');
          }else{
            this.alert.showAlert('Mensaje',resp.message,'error');
          }
        })
      })
    });

    
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.medicionService.add(this.currentModel).subscribe(resp=>{
      this.loadModels()
      this.alert.showAlert('Mensaje','Se guardo correctamente','success');
    })

  }

  borrar(model: Medicion) {
    this.alert.showAlertConfirm('Advertencia','¿Desea desactivar el registro?','warning',()=>{
      this.medicionService.delete(model).subscribe(x=>{
        this.loadModels()
        this.alert.showAlert('Mensaje','Eliminado con exito','info');
      })
    })
  }

 

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}




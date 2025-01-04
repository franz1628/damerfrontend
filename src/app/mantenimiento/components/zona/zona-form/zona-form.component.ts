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
    idTipoZona:[0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    descripcion: ['', Validators.required],
    numeroOrden: [0],
    planificadorRuta:['1'],
    idZona:[0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
 
  })

  public listTipoZona : TipoZona[] = [];
  listPrincipales : Zona[] = [];
  textBusquedaZona: string='';
  listaResultadosBusqueda:Zona[] = []
  zonaElegida:Zona = ZonaInit
  selectIndex:number=-1
  
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
    this.service.getPrincipales().subscribe(x=>this.listPrincipales = x.data)
  }
  
  get currentModel() {
    
    return this.myForm.value as Zona;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if(this.currentModel.idTipoZona == 0){
      this.alert.showAlert('¡Error!', 'Debe seleccionar una zona principal', 'error');  
      return;
    }

    if(!this.currentModel.id){
      this.service.add(this.currentModel).subscribe((resp) => {
        if(resp.state == 0){
          this.alert.showAlert('Advertencia!', resp.message, 'warning');
          return;
        }
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(ZonaInit);
        this.myForm.clearValidators()
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe((resp) => {
        if(resp.state == 0){
          this.alert.showAlert('Advertencia!', resp.message, 'warning');
          return;
        }
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }
  
  buscarZona() {
    this.service.postDescripcionPrincipal(this.textBusquedaZona).subscribe(x=>{
      this.listaResultadosBusqueda = x.data
    })
  }

  changeTipoZona(e: Event) {
    const valor = (e.target as HTMLInputElement).value;
    this.myForm.patchValue({planificadorRuta:0});
  }

  elegirZona() {
    this.myForm.patchValue({idZona:this.zonaElegida.id});
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

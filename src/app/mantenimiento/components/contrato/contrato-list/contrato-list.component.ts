import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ContratoService } from '../../../service/contrato';
import { Contrato, ContratoInit } from '../../../interface/contrato';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { FrecuenciaService } from '../../../service/frecuencia';
import { Frecuencia, FrecuenciaInit } from '../../../interface/frecuencia';
import { AlertService } from '../../../../shared/services/alert.service';
import { EstadoContratoService } from '../../../service/estadoContrato';
import { EstadoContrato } from '../../../interface/estadoContrato';
import { ContratoHistorial } from '../../../interface/contratoHistorial';
import { ContratoHistorialService } from '../../../service/contratoHistorial';
import { ContratoEdicionComponent } from '../contrato-edicion/contrato-edicion.component';

@Component({
  selector: 'app-contrato-list',
  templateUrl: './contrato-list.component.html'
})
export class ContratoListComponent implements OnInit{
  contratos:Contrato[]=[];
  listContratosGrupo:Contrato[][] = [];
  contrato:Contrato=ContratoInit;
  frecuencias:Frecuencia[] = [];
  estadoContratos:EstadoContrato[] = []; 

  @ViewChild('botonCerrarModalEstado') botonCerrarModalEstado!: ElementRef;
  @Output()emitEditarContrato:EventEmitter<Contrato> = new EventEmitter();
 
  model:FormGroup = this.fb.group({
    diaEntrega : [0,[Validators.required,Validators.pattern('^(0*[1-9]|[1-2][0-9]|30|31)$')]],
    fechaInicio:['',Validators.required],
    fechaFin : ['',Validators.required],
    extension : [0,Validators.required],
    idFrecuencia : [0,[Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    shot : [0,Validators.required],
  })

  modelEstadoContrato:FormGroup = this.fb.group({
    idEstadoContrato : [0,[Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    motivo:['',Validators.required],
  })

  constructor(
    private service : ContratoService,
    private fb:FormBuilder,
    private validForm: ValidFormService,
    private serviceFrecuencia: FrecuenciaService,
    private serviceContrato: ContratoService,
    private serviceEstadoContrato:EstadoContratoService,
    private serviceContratoHistorial:ContratoHistorialService,
    private alert : AlertService
    ){  
 
  }
 
  ngOnInit(): void {
    this.actualizarContratos();

    //Frecuencias
    this.serviceFrecuencia.get().subscribe(x=>{
      this.frecuencias = x.data;
    })

    this.serviceEstadoContrato.get().subscribe(x=>{
      this.estadoContratos = x.data;
    })


  } 

  actualizarContratos(){
    this.service.getContratos().subscribe(x=>{
      this.contratos = x.data;

      const resultadoMap = new Map<string, Contrato[]>();

      this.contratos.forEach(elemento => {
          const clave = elemento.idCliente + '-' + elemento.idCategoria;
          if (!resultadoMap.has(clave)) {
              resultadoMap.set(clave, []);
          }
          resultadoMap.get(clave)?.push(elemento);
      });
        
      const resultadoFinal: Contrato[][] = Array.from(resultadoMap.values());
      this.listContratosGrupo = resultadoFinal;
    })
  }

  asignaFormContrato(contrato:Contrato){
    this.contrato = contrato;
    this.model.patchValue({...contrato});
  }

  modalEstadoContrato(contrato:Contrato){
    this.contrato = contrato;
  }
 
  submitEditarForm(){
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    } 

    this.serviceContrato.update(this.contrato.id,this.model.value).subscribe(x=>{
      this.actualizarContratos();
      this.alert.showAlert('Mensaje','Guardado correctamente','success');      
    })
  } 

  submitEstadoContrato(e:Event){

    if (this.modelEstadoContrato.invalid) {
      this.modelEstadoContrato.markAllAsTouched();
      return;
    }
 
    const contratoHistorial:ContratoHistorial = {
      id:0,
      idContrato:this.contrato.id,
      idEstadoContrato:this.modelEstadoContrato.get('idEstadoContrato')?.value,
      motivo : this.modelEstadoContrato.get('motivo')?.value
    } 

    this.serviceContrato.updateEstado(this.contrato.id,{idEstadoContrato:this.modelEstadoContrato.get('idEstadoContrato')?.value}).subscribe(x=>{
      this.serviceContratoHistorial.add(contratoHistorial).subscribe(x=>{
        this.botonCerrarModalEstado.nativeElement.click();
        this.modelEstadoContrato.reset();
        this.actualizarContratos();
        this.alert.showAlert('Mensaje','Estado guardado correctamente','success');    
      })  
    })
  }

  handleEditarContrato(contrato:Contrato){
    this.emitEditarContrato.emit(contrato);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

  isValidFieldEstadoContrato(field: string): boolean | null {
    return this.validForm.isValidField(field, this.modelEstadoContrato);
  }

  getFieldErrorEstadoContrato(field: string): string | null {
    return this.validForm.getFieldError(field, this.modelEstadoContrato);
  }

}

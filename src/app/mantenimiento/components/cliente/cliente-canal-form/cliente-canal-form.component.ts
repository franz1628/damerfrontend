import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteCanal, ClienteCanalInit } from '../../../interface/clienteCanal';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { AlertService } from '../../../../shared/services/alert.service';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { CanalService } from '../../tablas/service/canal.sevice';
import { RegexService } from '../../../../shared/services/regex.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-cliente-canal-form',
  templateUrl: './cliente-canal-form.component.html'
})
export class ClienteCanalFormComponent {
  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit; 
  canals:Canal[] = []; 

  public model = this.fb.group({
    id:[0],
    idCliente: [0,Validators.required],
    idCanal: [0,Validators.required],
    nombreAgrupacion: ['',Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteCanalService,
    private serviceCanal : CanalService,
    private regexService : RegexService,
    private alert : AlertService,
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({idCliente:this.cliente.id});

    this.serviceCanal.get().subscribe(x=>{
      this.canals = x.data;
    })
  }

  get getModel() {
    return this.model.value as ClienteCanal
  }

  actualizarList() {
    this.actualizarListEmit.emit();
  }

  agregar() {
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    this.service.postIdCliente(this.getModel.idCliente).subscribe(x=>{
      const canales = x.data

      if(canales.find(x=>x.idCanal == this.getModel.idCanal)){
        this.alert.showAlert('Advertencia','Este canal ya fue agregado','warning')
        return
      }else{
        this.service.add(this.getModel).subscribe(resp => {
          this.reset();
          this.actualizarList();
        })
      }

    })
 
  }

  reset(){
    this.model.patchValue({
      idCanal : 0,
      nombreAgrupacion : ''
    });

 
    //this.resetModelEmit.emit();
  }

  editar(){
    this.service.update(this.getModel.id,this.getModel).pipe(
      catchError(error => {
        this.alert.showAlert('Mensaje',error.error.message,'warning');
        return throwError(()=>error);
      })
    ).subscribe(x=>{
        this.alert.showAlert('Mensaje',x.message,'success');
        this.actualizarList();
        this.reset();
    });
  }  

  selectEdit(model: ClienteCanal) {
    this.model.patchValue(model);
  } 

  nuevo() {
    this.model.patchValue(ClienteCanalInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}

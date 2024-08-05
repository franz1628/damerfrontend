import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MegaCategoria, MegaCategoriaInit } from '../../../interfaces/megaCategoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../shared/services/validForm.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';
import { CanastaService } from '../../../services/canasta.service';
import { Canasta, CanastaInit } from '../../../interfaces/canasta.interface';

@Component({
  selector: 'app-mega-categoria-form',
  templateUrl: './mega-categoria-form.component.html'
})
export class MegaCategoriaFormComponent implements OnInit, OnChanges{

 
  @Input()
  public model: MegaCategoria = MegaCategoriaInit;
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<number> = new EventEmitter();
  @Output() changeCodigoEmit: EventEmitter<number> = new EventEmitter();
  @Output() changeCanastaEmit: EventEmitter<number> = new EventEmitter();


  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    idCanasta: [0, Validators.required],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
    Canasta:[CanastaInit]
  })

  public listCanasta: Canasta[] = [];

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: MegaCategoriaService,
    private canastaService: CanastaService
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
    this.showLoading = true
    this.loadModels();
    //this.myForm.get('idCanasta')?.disable();
  }

  loadModels(){
    this.canastaService.get().subscribe(resp => {
      this.listCanasta = resp.data
    });
  }

  get currentModel() {
    return this.myForm.value as MegaCategoria;
  }

  cambiaCanasta(e:Event) {
    const valor = (e.target as HTMLInputElement).value;

    this.setIdCanasta({...CanastaInit,id:parseInt(valor)});

    this.changeCanastaEmit.emit(+valor);
    
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit(this.currentModel.idCanasta);
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.clearValidators();
        this.myForm.patchValue({...MegaCategoriaInit,idCanasta:this.currentModel.idCanasta});

      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit(this.currentModel.idCanasta);
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: MegaCategoria) {
    this.myForm.patchValue(model);
  }

  setIdCanasta(canasta: Canasta) {
    this.canastaService.get().subscribe(resp => {
      this.listCanasta = resp.data
      this.myForm.patchValue({ idCanasta: canasta.id});
    
      
    });
   
  }

  nuevo() {
    this.myForm.patchValue(MegaCategoriaInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

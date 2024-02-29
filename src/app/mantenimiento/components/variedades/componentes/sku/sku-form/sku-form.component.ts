import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sku, SkuInit } from '../../../interfaces/sku.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Canasta } from '../../../interfaces/canasta.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';
import { Categoria } from '../../../interfaces/categoria.interface';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../shared/services/validForm.service';
import { CategoriaService } from '../../../services/categoria.service';
import { SkuService } from '../../../services/sku.service';
import { CanastaService } from '../../../services/canasta.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';

@Component({
  selector: 'app-sku-form',
  templateUrl: './sku-form.component.html'
})
export class SkuFormComponent {
  @Input()
  public model: Sku = SkuInit;
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  @Output() editEmit: EventEmitter<Sku> = new EventEmitter();


  public descripcionSku : string = '';
  public modalBusquedaDescripcion : boolean = false;
  public skusBusqueda:Sku[] = [];

  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    idCanasta: [0, Validators.required],
    idMegaCategoria: [0, Validators.required],
    idCategoria: [0, Validators.required],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  public listCanasta: Canasta[] = [];
  public listMegaCategoria: MegaCategoria[] = [];
  public listCategoria: Categoria[] = [];

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: SkuService,
    private canastaService: CanastaService,
    private megaCategoriaService: MegaCategoriaService,
    private categoriaService: CategoriaService,
    ) {
      this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
      this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
      this.categoriaService.get().subscribe(resp => { this.listCategoria = resp.data });
  }

  ngOnInit() {
    this.showLoading = true
    this.myForm.get('idCanasta')?.disable();
    this.myForm.get('idMegaCategoria')?.disable();
    this.myForm.get('idCategoria')?.disable();
  }

  get currentModel() {
    return this.myForm.value as Sku;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(SkuInit);
        this.myForm.clearValidators();
        this.myForm.reset();
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setByCategoria(idCanasta: number,idMegaCategoria:number,idCategoria:number) {
    this.myForm.patchValue({ idCanasta: idCanasta, idMegaCategoria : idMegaCategoria, idCategoria:idCategoria });
  }

  setModel(model: Sku) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(SkuInit);
    this.myForm.clearValidators()
  }

  buscar(){ 
    const id = this.myForm.get('id')?.value;

    this.service.postId(id).subscribe(resp => {
      this.myForm.patchValue(resp);
     // this.selectCategoriaEmit.emit(resp);
    })
    
  }

  elegirSkuBusqueda(sku: Sku) {
    this.myForm.patchValue({id:sku.id});
    this.buscar();
    this.editEmit.emit(sku)
    this.model = sku;
    
  }    

  cambioDescripcion(event:Event){
    const e = event.target as HTMLInputElement;
    this.descripcionSku = e.value;
    
  }

  buscarDescripcion() {

    if(this.descripcionSku!=''){
      this.modalBusquedaDescripcion = true;
      this.service.postDescripcion(this.descripcionSku).subscribe(x=>{
        this.skusBusqueda = x;
      });

    }
  } 

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

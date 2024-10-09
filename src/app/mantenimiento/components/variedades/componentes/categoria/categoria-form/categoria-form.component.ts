import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria, CategoriaInit } from '../../../interfaces/categoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../shared/services/validForm.service';
import { CategoriaService } from '../../../services/categoria.service';
import { CanastaService } from '../../../services/canasta.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';
import { Canasta } from '../../../interfaces/canasta.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent {


  @Input()
  public model: Categoria = CategoriaInit;
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<number> = new EventEmitter();
  @Output() selectCategoriaEmit: EventEmitter<Categoria> = new EventEmitter();
  @Output() editEmit: EventEmitter<Categoria> = new EventEmitter()

  public descripcionCategoria : string = '';
  public modalBusquedaDescripcion : boolean = false;
  public categoriasBusqueda:Categoria[] = [];


  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    idCanasta: [0, Validators.required],
    idMegaCategoria: [0, Validators.required],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  public listCanasta: Canasta[] = [];
  public listMegaCategoria: MegaCategoria[] = [];

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: CategoriaService,
    private canastaService: CanastaService,
    private megaCategoriaService: MegaCategoriaService,
    ) {
      
  }

  ngOnInit() {
    this.showLoading = true
    this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
    this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
  }

  get currentModel() {
    return this.myForm.value as Categoria;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe((res) => {
        if(res.state==0){
          this.alert.showAlert('¡Advertencia!', res.message, 'warning');
        }else{
          this.showLoading = false;
          this.updateModelsEmit.emit(+this.myForm.get('idMegaCategoria')?.value);
          this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
          //this.myForm.patchValue(CategoriaInit);
          this.myForm.clearValidators();
          this.myForm.patchValue({descripcion:'',alias1:''})
         // this.myForm.reset();
        }
       
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit(+this.myForm.get('idMegaCategoria')?.value);
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setIdCanastaIdMegaCategoria(idCanasta: number,idMegaCategoria:number) {
    this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
    this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
    this.myForm.patchValue({ idCanasta: idCanasta, idMegaCategoria : idMegaCategoria });
  }

  setModel(model: Categoria) {
    this.myForm.patchValue(model); 
  }
  
  nuevo() {
    const idCanasta = this.currentModel.idCanasta;
    const idMegaCategoria = this.currentModel.idMegaCategoria;
 
    this.myForm.patchValue(CategoriaInit);
    this.myForm.patchValue({idCanasta:idCanasta,idMegaCategoria:idMegaCategoria});
    this.myForm.clearValidators()
  }

  buscar(){ 
    const id = this.myForm.get('id')?.value;

    this.service.postId(id).subscribe(resp => {
      this.myForm.patchValue(resp);
      this.selectCategoriaEmit.emit(resp);
    })
    
  }

  elegirCategoriaBusqueda(categoria: Categoria) {
    this.myForm.patchValue({id:categoria.id,idMegacategoria:categoria.idMegaCategoria});
    this.buscar();
    this.editEmit.emit(categoria)

  }   

  cambioDescripcion(event:Event){
    const e = event.target as HTMLInputElement;
    this.descripcionCategoria = e.value;
    
  }

  buscarDescripcion() {

    if(this.descripcionCategoria!=''){
      this.modalBusquedaDescripcion = true;
      this.service.postDescripcion(this.descripcionCategoria).subscribe(x=>{
        this.categoriasBusqueda = x;
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

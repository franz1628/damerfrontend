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
import { TipoCategoria } from '../../../interfaces/tipoCategoria.interface';
import { TipoCategoriaService } from '../../../services/tipoCategoria.service';

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
    idCanasta: [{ value: 0, disabled: false }, Validators.required],
    idMegaCategoria: [0, Validators.required],
    idTipoCategoria: [0, Validators.required],
    idCategoria: [0],
    idCategorias: [''],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  listCanasta: Canasta[] = [];
  listMegaCategoria: MegaCategoria[] = [];
  listTipoCategorias: TipoCategoria[] = [];
  listCategorias: Categoria[] = [];
  grupoCategorias: Categoria[] = [];

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: CategoriaService,
    private canastaService: CanastaService,
    private megaCategoriaService: MegaCategoriaService,
    private tipoCategoriaService: TipoCategoriaService,
    private categoriaService: CategoriaService
    ) {
      
  }

  ngOnInit() {
    this.showLoading = true
    this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
    this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
    this.tipoCategoriaService.get().subscribe(resp => { this.listTipoCategorias = resp.data });
   
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
      if((this.currentModel.idTipoCategoria==2 || this.currentModel.idTipoCategoria==3) &&  this.grupoCategorias.length<2){
        this.alert.showAlert('¡Advertencia!', 'Debe seleccionar al menos 2 categorias', 'warning');
        return;
      }

      this.myForm.get('idCategorias')?.setValue(this.grupoCategorias.map(x=>x.id).join(','));
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
      this.service.update(this.currentModel.id, this.currentModel).subscribe((x) => {
        if(x.state==1){
          this.showLoading = false;
          this.updateModelsEmit.emit(+this.myForm.get('idMegaCategoria')?.value);
          this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        }else{
          this.showLoading = false;
          //this.updateModelsEmit.emit(+this.myForm.get('idMegaCategoria')?.value);
          this.alert.showAlert('¡Advertencia!', x.message, 'warning');
        }
       
      });
    }
  }

  setIdCanastaIdMegaCategoria(idCanasta: number,idMegaCategoria:number) {
    this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
    this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
    this.myForm.patchValue({ idCanasta: idCanasta, idMegaCategoria : idMegaCategoria });
    this.categoriaService.getIdCanastaMegaCategoria(idMegaCategoria).subscribe(resp => {this.listCategorias = resp.data;});
  }

  

  setModel(model: Categoria) {
    this.myForm.get('idCanasta')?.disable()
    this.myForm.get('idMegaCategoria')?.disable();
    this.myForm.get('alias1')?.disable();
    this.myForm.get('idTipoCategoria')?.disable();
    this.myForm.get('idCategoria')?.disable();
    this.myForm.patchValue(model); 
  }
  
  nuevo() {
    this.myForm.get('idCanasta')?.enable();
    this.myForm.get('idMegaCategoria')?.enable();
    this.myForm.get('alias1')?.enable();
    this.myForm.get('idTipoCategoria')?.enable();
    this.myForm.get('idCategoria')?.enable();
    this.grupoCategorias=[];

    const idCanasta = this.currentModel.idCanasta;
    const idMegaCategoria = this.currentModel.idMegaCategoria;

    this.myForm.patchValue({
      ...CategoriaInit,
      idCanasta: idCanasta,
      idMegaCategoria: idMegaCategoria
    });
  

    this.myForm.clearValidators();

    
  }

  get getGrupoCategorias(){
    const stringCategorias = this.currentModel.idCategorias;

    if(stringCategorias){
      const arrayCategorias = stringCategorias.split(',');
      const categorias = this.listCategorias.filter(x=>arrayCategorias.includes(x.id.toString()));
      this.grupoCategorias = categorias;
    }

    return this.grupoCategorias;
  }

  agregarCategoria(){
    const idCategoria = this.myForm.get('idCategoria')?.value;

    if(idCategoria!=0){
      if(this.grupoCategorias.find(x=>x.id==idCategoria) ){
        this.alert.showAlert('¡Advertencia!', 'La categoria ya fue agregada', 'warning')
      }else{
        const atributos = this.listCategorias.find(x=>x.id==idCategoria)?.CategoriaAtributoTecnico;
        const arrIdAtributos = atributos?.map(x=>x.idAtributoTecnicoVariedad);

        if(arrIdAtributos){
          const grupoAtributos = this.grupoCategorias.map(x=>x.CategoriaAtributoTecnico).flat().map(x=>x.idAtributoTecnicoVariedad);


          const atributosRepetidos = arrIdAtributos.filter(x=>grupoAtributos.includes(x));
          if(atributosRepetidos.length==0 && grupoAtributos.length>0){
            this.alert.showAlert('¡Advertencia!', 'La categoria no tiene atributos en comun', 'warning');
            return;
          }
        }
        
        this.grupoCategorias.push(this.listCategorias.find(x=>x.id==idCategoria)!);
      }
    }else{
      this.alert.showAlert('¡Advertencia!', 'Debe seleccionar una categoria', 'warning');
    }
  }

  eliminarCategoria(categoria: Categoria){
    this.grupoCategorias = this.grupoCategorias.filter(x=>x.id!=categoria.id);
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
    this.modalBusquedaDescripcion = false

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

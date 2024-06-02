import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Sku, SkuInit } from '../../../interfaces/sku.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Canasta, CanastaInit } from '../../../interfaces/canasta.interface';
import { MegaCategoria, MegaCategoriaInit } from '../../../interfaces/megaCategoria.interface';
import { Categoria, CategoriaInit } from '../../../interfaces/categoria.interface';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../shared/services/validForm.service';
import { CategoriaService } from '../../../services/categoria.service';
import { SkuService } from '../../../services/sku.service';
import { CanastaService } from '../../../services/canasta.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';
import { SkuHijosService } from '../../../services/skuHijos.service';

@Component({
  selector: 'app-sku-form',
  templateUrl: './sku-form.component.html'
})
export class SkuFormComponent implements OnChanges {


  @Input() model: Sku = SkuInit;
  @Input() idCategoria: number = 0

  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  @Output() editEmit: EventEmitter<Sku> = new EventEmitter();

  showCombo :boolean = false
  showPack :boolean = false


  nombrePack:string=''

  skuCombos:Sku[]=[]
  skuPack:Sku=SkuInit
  cantidadPack:number=1

  porcentajes:string[] = []

  categorias:Categoria[] = []
  idCategoriaCombo:string=''

  descripcionSkuCombo: string = '';
  modalBusquedaDescripcionCombo: boolean = false;
  skusBusquedaCombo: Sku[] = [];

  descripcionSkuPack: string = '';
  modalBusquedaDescripcionPack: boolean = false;
  skusBusquedaPack: Sku[] = [];

  descripcionSku: string = '';
  modalBusquedaDescripcion: boolean = false;
  skusBusqueda: Sku[] = [];

  myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    idCanasta: [0, Validators.required],
    idMegaCategoria: [0, Validators.required],
    idCategoria: [0, Validators.required],
    descripcion: ['', Validators.required],
    tipoSku: [1, Validators.required],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],

    descripcionSkuCombo:['']
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
    private skuHijosService:SkuHijosService,
    private elementRef: ElementRef,
    
  ) {
    /*this.canastaService.get().subscribe(resp => { this.listCanasta = resp.data });
    this.megaCategoriaService.get().subscribe(resp => { this.listMegaCategoria = resp.data });
    this.categoriaService.get().subscribe(resp => { this.listCategoria = resp.data });*/
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["idCategoria"]) {

    }
  }

  ngOnInit() {
    this.showLoading = true
    this.categoriaService.get().subscribe(x=>{
      this.categorias = x.data

      
    })
  }

  get currentModel() {
    return this.myForm.value as Sku;
  }

  submit() {
    if (this.myForm.invalid && this.currentModel.tipoSku==1) {
      this.myForm.markAllAsTouched();
      return;
    }

    const descripcion = this.myForm.get('descripcion')?.value;
    this.myForm.patchValue({ 'descripcionResumida': descripcion.slice(0, 50), 'tip': descripcion.slice(0, 20) })

    if(this.currentModel.tipoSku==1){
      if (!this.currentModel.id) {
        this.service.add(this.currentModel).subscribe(() => {
          this.showLoading = false;
          this.updateModelsEmit.emit();
          this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
          this.myForm.patchValue({ id: 0, descripcion: '', descripcionResumida: '', tip: '' });
          this.myForm.clearValidators();
  
        });
      } else {
        this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
          this.showLoading = false;
          this.updateModelsEmit.emit();
          this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        });
      }
    }else if(this.currentModel.tipoSku==2){ // PACK
   
      if(this.skuPack.id==0){
        this.alert.showAlert('Advertencia','Debe elegir un sku','warning')
        return
      }

      if (!this.currentModel.id) {
        this.showLoading = true
        this.skuHijosService.postPack(this.skuPack,this.cantidadPack,this.myForm.get('descripcion')?.value,this.model).subscribe(x=>{
          if(x.state==1){
            this.skuPack=SkuInit
            this.cantidadPack=1
            this.myForm.patchValue({descripcion:''})
            this.alert.showAlert('Mensaje',x.message,'success')
            this.updateModelsEmit.emit();
          }
          
          this.showLoading = false
        }) 
      }else{
        
        
        this.showLoading = true
        this.skuHijosService.updatePack(this.skuPack,this.cantidadPack,this.myForm.get('descripcion')?.value,this.model).subscribe(x=>{
          if(x.state==1){
            this.skuPack=SkuInit
            this.cantidadPack=1
            this.myForm.patchValue({descripcion:''})
            this.alert.showAlert('Mensaje',x.message,'success')
            this.updateModelsEmit.emit();
          }
          
          this.showLoading = false
        }) 
      }
    
      
    }else if(this.currentModel.tipoSku==3){ //COMBOS
      if(this.skuCombos.length==0){
   
        this.alert.showAlert('Advertencia','Debe elegir al menos un sku','warning')
        return
      }

      let sum = 0;
      for (const number of this.porcentajes) {
        sum += parseFloat(number);
      }

      if(sum!=100){
        this.alert.showAlert('Advertencia','Los porcentajes deben sumar 100','warning')
        return
      }

      if (!this.currentModel.id) {
        this.showLoading = true
        this.skuHijosService.postCombo(this.skuCombos,this.myForm.get('descripcion')?.value,this.porcentajes,this.model).subscribe(x=>{
          if(x.state==1){
            this.skuCombos=[]
       
            this.alert.showAlert('Mensaje',x.message,'success')
            this.updateModelsEmit.emit();
          }
          this.showLoading = false
        })
      }else{
        this.showLoading = true
        this.skuHijosService.updateCombo(this.skuCombos,this.myForm.get('descripcion')?.value,this.porcentajes,this.model).subscribe(x=>{
          if(x.state==1){
            this.skuCombos=[]
       
            this.alert.showAlert('Mensaje',x.message,'success')
            this.updateModelsEmit.emit();
          }
          this.showLoading = false
        })
      }

      
      
    }
  }

  eligeCategoriaCombo(e: Event) {
    const valor = (e.target as HTMLInputElement).value
    this.idCategoriaCombo = valor
  }

  eligeTipoSku(e: Event) {
    const valor = (e.target as HTMLInputElement).value;
    
    if(valor=="1"){ 
      this.showCombo=false
      this.showPack=false
    }else if(valor=="2"){
      this.showCombo=false
      this.showPack=true
    }else if(valor=="3"){
      this.showCombo=true
      this.showPack=false
    }
  }

  setByCategoria(idCanasta: number, idMegaCategoria: number, idCategoria: number) {

    this.canastaService.postId(idCanasta).subscribe(x => { this.model.Canasta = x || CanastaInit; this.model.idCanasta = idCanasta })
    this.megaCategoriaService.postId(idMegaCategoria).subscribe(x => { this.model.MegaCategoria = x || MegaCategoriaInit; this.model.idMegaCategoria = idMegaCategoria })
    this.categoriaService.postId(idCategoria).subscribe(x => { this.model.Categoria = x || CategoriaInit; this.model.idCategoria = idCategoria })



    this.myForm.patchValue({ idCanasta: idCanasta, idMegaCategoria: idMegaCategoria, idCategoria: idCategoria });


  }

  setModel(model: Sku) {


    this.myForm.patchValue(model);
  }

  nuevo() {
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled=false
    this.myForm.patchValue(SkuInit);
    this.myForm.clearValidators()
  }

  buscar() {
    const id = this.myForm.get('id')?.value;

    this.service.postId(id).subscribe(resp => {
      this.myForm.patchValue(resp);
      // this.selectCategoriaEmit.emit(resp);
    })

  }



  
  elegirSkuBusqueda(sku: Sku) {
 
    this.myForm.patchValue({ id: sku.id });
    this.buscar();
    this.editEmit.emit(sku)
    this.model = sku;

    if(sku.tipoSku==3){
      for (let i = 0; i < sku.SkuHijos.length; i++) {
        this.skuCombos.push(sku.SkuHijos[i].Sku);
        this.porcentajes.push(sku.SkuHijos[i].porcentaje.toString())
      }
    }else if(sku.tipoSku==2){
      this.skuPack = sku.SkuHijos[0].Sku;
      this.cantidadPack = sku.SkuHijos[0].cantidad
    }

    //this.myForm.get('tipoSku')?.disabled 
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled=true

  }

  elegirSku(sku:Sku){
    console.log(sku);
    
    this.myForm.patchValue(sku);
    this.model = sku;

    if(sku.tipoSku==3){
      for (let i = 0; i < sku.SkuHijos.length; i++) {
        this.skuCombos.push(sku.SkuHijos[i].Sku);
        this.porcentajes.push(sku.SkuHijos[i].porcentaje.toString())
      }
    }else if(sku.tipoSku==2){
      this.skuPack = sku.SkuHijos[0].Sku;
      this.cantidadPack = sku.SkuHijos[0].cantidad
    }

    //this.myForm.get('tipoSku')?.disabled 
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled=true
  }

  elegirSkuBusquedaCombo(sku: Sku) {
    this.skuCombos.push(sku)
    this.porcentajes.push("0")
  }

  elegirSkuBusquedaPack(sku: Sku) {

    if(this.skuPack.id==0){
      this.skuPack = sku
    }else{
      this.alert.showAlert('Adventencia','Debe quitar el sku antes de elegir otro','warning')
    }
    
  }

  cambioDescripcion(event: Event) {
    const e = event.target as HTMLInputElement;
    this.descripcionSku = e.value;
  }

  cambioDescripcionCombo(event: Event) {
    const e = event.target as HTMLInputElement;
    this.descripcionSkuCombo = e.value;
  }

  cambioDescripcionPack(event: Event) {
    const e = event.target as HTMLInputElement;
    this.descripcionSkuPack = e.value;
  }

  buscarDescripcion() {
    if (this.descripcionSku != '') {
      this.modalBusquedaDescripcion = true;
      this.service.postDescripcion(this.descripcionSku).subscribe(x => {
        console.log(x);
        
        this.skusBusqueda = x;
      });
    }
  }

  buscarDescripcionCombo() {
    if (this.descripcionSkuCombo != '' && this.idCategoriaCombo!='') {
      this.modalBusquedaDescripcionCombo = true;
      this.service.postDescripcionCategoria(this.descripcionSkuCombo,this.idCategoriaCombo).subscribe(x => {
        this.skusBusquedaCombo = x;
      });
    } else{
      this.alert.showAlert('Advertencia','Debe elegir categoria y combo','warning')
    }
  }

  buscarDescripcionPack() {
    if (this.descripcionSkuPack != '') {
      this.modalBusquedaDescripcionPack = true;
      this.service.postDescripcion(this.descripcionSkuPack).subscribe(x => {
        this.skusBusquedaPack = x;
      });
    } 
  }


  inputPorcentaje(e: Event,i: number) {
    const valor = (e.target as HTMLInputElement).value

    this.porcentajes[i] = valor;

  }


  cantidadSku(e:Event){ 
    const valor = (e.target as HTMLInputElement).value;
    this.cantidadPack = parseInt(valor);
  }

  borrarSkuCombo(indice: number) { 
    this.skuCombos = this.skuCombos.filter((x,index)=>index != indice);
  }

  borrarSkuPack() {
    this.skuPack = SkuInit;
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

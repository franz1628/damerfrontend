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
import { FileUploadServiceService } from '../../../../../../shared/services/file-upload-service.service';
import { HttpEventType } from '@angular/common/http';
import { environments } from '../../../../../../../environments/environments';

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
  @Output() busquedaEmit: EventEmitter<string> = new EventEmitter();

  showCombo: boolean = false
  showPack: boolean = false

  baseUrl:string= environments.baseUrl 

  file: File | null = null;
  progress: number = 0;

  nombrePack: string = ''

  skuCombos: Sku[] = []
  skuPack: Sku = SkuInit
  cantidadPack: number = 1

  porcentajes: string[] = []

  categorias: Categoria[] = []
  idCategoriaCombo: string = ''

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
    refrigeracion: [0, Validators.required],
    barras: [''],
    descripcionResumida: [''],
    tip: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
    descripcionSkuCombo: [''],
    image : ['']
  })

  listCanasta: Canasta[] = [];
  listMegaCategoria: MegaCategoria[] = [];
  listCategoria: Categoria[] = [];
  image:string= '';

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: SkuService,
    private canastaService: CanastaService,
    private megaCategoriaService: MegaCategoriaService,
    private categoriaService: CategoriaService,
    private skuHijosService: SkuHijosService,
    private elementRef: ElementRef,
    private fileUploadService: FileUploadServiceService

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
    this.categoriaService.get().subscribe(x => {
      this.categorias = x.data


    })
  }

  get currentModel() {
    return this.myForm.value as Sku;
  }

  get getSrc() {

    
    if(this.model.image==''){
      return this.baseUrl+environments.imgNotFound;
    }else{
      return this.baseUrl+'uploads/sku/'+this.model.image;
    }
  }

  submit() {
    if (this.myForm.invalid && this.currentModel.tipoSku == 1) {
      this.myForm.markAllAsTouched();
      return;
    }

    const descripcion = this.myForm.get('descripcion')?.value.trim();
    this.myForm.patchValue({ 'descripcion':descripcion.trim(),'descripcionResumida': descripcion.slice(0, 50), 'tip': descripcion.slice(0, 20) })

    if (this.currentModel.tipoSku == 1) {
      if (!this.currentModel.id) { //NUEVO
        this.currentModel.medicion = parseInt(localStorage.getItem('medicion') || '0');
        this.service.add(this.currentModel).subscribe(e => {
          if(e.state==0){
            this.alert.showAlert("Advertencia",e.message,"warning");
            return;
          }

          if (this.file) {

            const maxSize = 300 * 1024; 
            const allowedTypes = ['image/png', 'image/jpeg'];

            if (this.file.size > maxSize) {
              this.alert.showAlert('Advertencia', 'El archivo es demasiado grande. El tamaño máximo permitido es 300KB.', 'warning')

              return;
            }

            if (!allowedTypes.includes(this.file.type)) {
              this.alert.showAlert('Advertencia', 'Tipo de archivo no permitido. Solo se permiten archivos PNG y JPG.', 'warning')
              return;
            }

            this.fileUploadService.uploadImageSku(this.file, { ...this.currentModel, id: e.data.id }).subscribe(
              event => {
                
                switch (event.type) {
                  case HttpEventType.UploadProgress:
                    this.progress = Math.round(100 * (event.loaded / event.total!));
                    break;
                  case HttpEventType.Response:
                    this.progress = 0;
                    break;
                }

                this.showLoading = false;
                this.updateModelsEmit.emit();
                this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
                this.myForm.patchValue({ id: 0, descripcion: '', descripcionResumida: '', tip: '' });
                this.myForm.clearValidators();
                this.limpiar();

              }
            );
          }else{
            this.showLoading = false;
            this.updateModelsEmit.emit();
            this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
            this.myForm.patchValue({ id: 0, descripcion: '', descripcionResumida: '', tip: '' });
            this.myForm.clearValidators();
            this.limpiar();
          }

          

        });
      } else { //EDITAR

        if (this.file) {

          const maxSize = 300 * 1024; 
          const allowedTypes = ['image/png', 'image/jpeg'];

        
          if (this.file.size > maxSize) {
            this.alert.showAlert('Advertencia', 'El archivo es demasiado grande. El tamaño máximo permitido es 300KB.', 'warning')
            return;
          }

          if (!allowedTypes.includes(this.file.type)) {
            this.alert.showAlert('Advertencia', 'Tipo de archivo no permitido. Solo se permiten archivos PNG y JPG.', 'warning')
            return;
          }

          this.fileUploadService.uploadImageSku(this.file, { ...this.currentModel, id: this.currentModel.id}).subscribe(
            event => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  this.progress = Math.round(100 * (event.loaded / event.total!));
                  break;
                case HttpEventType.Response:
                    this.progress = 0;
                    this.service.update(this.currentModel.id, this.currentModel).subscribe((x) => {

                      if(x.state==0){
                        this.alert.showAlert("Advertencia",x.message,"warning");
                        return;
                      }


                      this.model.image = x.data.image
                      
                      this.showLoading = false;
                      this.updateModelsEmit.emit();

            
                      this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
            
                    
                    });
                    break;
        
              }
            }
          );

       
        }else{
          this.service.update(this.currentModel.id, this.currentModel).subscribe((x) => {

            if(x.state==0){
              this.alert.showAlert("Advertencia",x.message,"warning");
              return;
            }

            this.model = x.data;
            this.showLoading = false;
            this.updateModelsEmit.emit();
           // this.model.image = this.currentModel.image;
  
            this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
  
          
          });
        }


        
      }
    } else if (this.currentModel.tipoSku == 2) { // PACK

      if (this.skuPack.id == 0) {
        this.alert.showAlert('Advertencia', 'Debe elegir un sku', 'warning')
        return
      }

      if (!this.currentModel.id) {
        this.showLoading = true
        this.skuHijosService.postPack(this.skuPack, this.cantidadPack, this.myForm.get('descripcion')?.value, this.model).subscribe(x => {
          if (x.state == 1) {
            this.skuPack = SkuInit
            this.cantidadPack = 1
            this.myForm.patchValue({ descripcion: '' })
            this.alert.showAlert('Mensaje', x.message, 'success')
            this.updateModelsEmit.emit();
          }

          this.showLoading = false
        })
      } else {


        this.showLoading = true
        this.skuHijosService.updatePack(this.skuPack, this.cantidadPack, this.myForm.get('descripcion')?.value, this.model).subscribe(x => {
          if (x.state == 1) {
            this.skuPack = SkuInit
            this.cantidadPack = 1
            this.myForm.patchValue({ descripcion: '' })
            this.alert.showAlert('Mensaje', x.message, 'success')
            this.updateModelsEmit.emit();
          }

          this.showLoading = false
        })
      }


    } else if (this.currentModel.tipoSku == 3) { //COMBOS
      if (this.skuCombos.length == 0) {

        this.alert.showAlert('Advertencia', 'Debe elegir al menos un sku', 'warning')
        return
      }

      let sum = 0;
      for (const number of this.porcentajes) {
        sum += parseFloat(number);
      }

      if (sum != 100) {
        this.alert.showAlert('Advertencia', 'Los porcentajes deben sumar 100', 'warning')
        return
      }

      if (!this.currentModel.id) {
        this.showLoading = true
        this.skuHijosService.postCombo(this.skuCombos, this.myForm.get('descripcion')?.value, this.porcentajes, this.model).subscribe(x => {
          if (x.state == 1) {
            this.skuCombos = []

            this.alert.showAlert('Mensaje', x.message, 'success')
            this.updateModelsEmit.emit();
          }
          this.showLoading = false
        })
      } else {
        this.showLoading = true
        this.skuHijosService.updateCombo(this.skuCombos, this.myForm.get('descripcion')?.value, this.porcentajes, this.model).subscribe(x => {
          if (x.state == 1) {
            this.skuCombos = []

            this.alert.showAlert('Mensaje', x.message, 'success')
            this.updateModelsEmit.emit();
          }
          this.showLoading = false
        })
      }



    }
  }

  limpiar() {
    this.myForm.patchValue({
      descripcion:'',
      refrigeracion:0,
      barras:'',
      image:''
    }) 
    this.model.image = ''
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.baseUrl+environments.imgNotFound; // Reemplaza con la ruta de tu imagen alternativa
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  eligeCategoriaCombo(e: Event) {
    const valor = (e.target as HTMLInputElement).value
    this.idCategoriaCombo = valor
  }

  deleteImage() {
    if(this.model.id==0){
      this.alert.showAlert('Advertencia','Debe elegir un SKU','warning');
      return;
    }

    this.alert.showAlertConfirm('Advertencia','¿Desea eliminar la imagen?','warning',()=>{

      this.service.deleteImage(this.model).subscribe(x=>{
        if(x.state==1){
          this.model.image=''
          this.alert.showAlert('Mensaje','Eliminado correctamente','success');
        }else{
          this.alert.showAlert('Advertencia','Ocurrio un error, intentelo más tarde','warning');
        }
      })
    })
  }


  eligeTipoSku(e: Event) {
    this.skuCombos = []
    this.porcentajes = []
    
    const valor = (e.target as HTMLInputElement).value;

    if (valor == "1") {
      this.showCombo = false
      this.showPack = false
    } else if (valor == "2") {
      this.showCombo = false
      this.showPack = true
    } else if (valor == "3") {
      this.showCombo = true
      this.showPack = false
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
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled = false
    this.myForm.patchValue(SkuInit);
    this.myForm.clearValidators()
    this.limpiar() 
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

    if (sku.tipoSku == 3) {
      for (let i = 0; i < sku.SkuHijos.length; i++) {
        this.skuCombos.push(sku.SkuHijos[i].Sku);
        this.porcentajes.push(sku.SkuHijos[i].porcentaje.toString())
      }
    } else if (sku.tipoSku == 2) {
      this.skuPack = sku.SkuHijos[0].Sku;
      this.cantidadPack = sku.SkuHijos[0].cantidad
    }

    //this.myForm.get('tipoSku')?.disabled 
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled = true

  }

  elegirSku(sku: Sku) {
    this.myForm.patchValue({...sku,image:''});
    this.model = sku;

    if (sku.tipoSku == 3) {
      this.skuCombos = []
      this.porcentajes = []
      for (let i = 0; i < sku.SkuHijos.length; i++) {
        this.skuCombos.push(sku.SkuHijos[i].Sku);
        this.porcentajes.push(sku.SkuHijos[i].porcentaje.toString())
      }
    } else if (sku.tipoSku == 2) {
      this.skuPack = sku.SkuHijos[0].Sku;
      this.cantidadPack = sku.SkuHijos[0].cantidad
    }

    //this.myForm.get('tipoSku')?.disabled 
    this.elementRef.nativeElement.querySelector('#tipoSku').disabled = true
  }

  elegirSkuBusquedaCombo(sku: Sku) {
    this.skuCombos.push(sku)
    this.porcentajes.push("0")
  }

  elegirSkuBusquedaPack(sku: Sku) {

    if (this.skuPack.id == 0) {
      this.skuPack = sku
    } else {
      this.alert.showAlert('Adventencia', 'Debe quitar el sku antes de elegir otro', 'warning')
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
        this.busquedaEmit.emit(this.descripcionSku);
        this.skusBusqueda = x;
      });
    }
  }

  buscarDescripcionCombo() {
    if (this.descripcionSkuCombo != '' && this.idCategoriaCombo != '') {
      this.modalBusquedaDescripcionCombo = true;
      this.service.postDescripcionCategoria(this.descripcionSkuCombo, this.idCategoriaCombo).subscribe(x => {
        this.skusBusquedaCombo = x;
      });
    } else {
      this.alert.showAlert('Advertencia', 'Debe elegir categoria y combo', 'warning')
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


  inputPorcentaje(e: Event, i: number) {
    const valor = (e.target as HTMLInputElement).value

    this.porcentajes[i] = valor;

  }


  cantidadSku(e: Event) {
    const valor = (e.target as HTMLInputElement).value;
    this.cantidadPack = parseInt(valor);
  }

  borrarSkuCombo(indice: number) {
    this.skuCombos = this.skuCombos.filter((x, index) => index != indice);
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

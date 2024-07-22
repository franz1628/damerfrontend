import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteCategoria, ClienteCategoriaInit } from '../../../interface/clienteCategoria';
import { catchError, forkJoin, lastValueFrom, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { Categoria } from '../../variedades/interfaces/categoria.interface';
import { CategoriaService } from '../../variedades/services/categoria.service';

@Component({
  selector: 'app-cliente-categoria-form',
  templateUrl: './cliente-categoria-form.component.html' 
})
export class ClienteCategoriaFormComponent {
  @Input()
  cliente: Cliente = ClienteInit

  selectIndex: number = -1
  categorias : Categoria[] = []
  
  showLoading: boolean = false;

  clienteCategorias: ClienteCategoria[] = [];

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  constructor(
    private service: ClienteCategoriaService,
    private serviceCategoria: CategoriaService,
    private fb: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    // this.loadModels();
    // this.serviceCategoria.get().subscribe(x=>{
    //   this.categorias =x.data
      
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      this.loadModels();

    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdCliente(this.cliente.id),
        serviceCategoria : this.serviceCategoria.get()
      }
    ).subscribe({
      next: value => {
        this.clienteCategorias = value.service.data
        this.categorias = value.serviceCategoria.data

        this.clienteCategorias.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idCategoria: [model.idCategoria],
            idCliente: [model.idCliente],
          });

         
         

          this.modelosArray.push(nuevoModelo);
        });

        if (this.clienteCategorias.length == 0) {
          this.add();
        }

        this.showLoading = false;
      }
    })

  }

  get getModel() {
    return this.cliente;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(index: number) {
    const filas:ClienteCategoria[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteCategoria = this.modelosArray.at(index).value;
    
    if(filas.find(x=>x.idCategoria == modelo.idCategoria)){
      this.alert.showAlert("Advertencia","Esa categoria ya esta agregada","warning");
      return
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[index].getRawValue();
      //this.atributoFuncionalVariedad = modelo;
      this.service.update(modelo.id, modelo).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index
  }


  add() {

    const nuevoModelo = this.fb.group({
      id: [0],
      idCliente: [this.cliente.id],
      idCategoria: [0],

    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const filas:ClienteCategoria[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteCategoria = this.modelosArray.at(num).value;

    if(modelo.idCategoria==0){
      this.alert.showAlert("Advertencia","Debe elegir una categoria","warning");
      return
    }

    if(filas.find(x=>x.idCategoria == modelo.idCategoria)){
      this.alert.showAlert("Advertencia","Esa categoria ya esta agregada","warning");
      return
    }

    this.showLoading = true;

    try {
      await lastValueFrom(this.service.add(modelo));
      this.alert.showAlert('Mensaje', 'Agregado correctamente', 'success');
      this.loadModels();
      this.showLoading = false;
    } catch (error) {
      this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
      this.showLoading = false;
    }
  }

  async delete(num: number) {
    this.alert.showAlertConfirm('Advertencia', '¿Está seguro de eliminar?', 'warning', async () => {
      const modelo = this.modelosArray.at(num).value;
      this.showLoading = true;

      try {
        await lastValueFrom(this.service.delete(modelo));
        this.alert.showAlert('Mensaje', 'Eliminado correctamente', 'success');
        this.loadModels();
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }
}

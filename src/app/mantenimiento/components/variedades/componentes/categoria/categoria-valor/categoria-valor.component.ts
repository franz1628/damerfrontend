import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoriaAtributoTecnicoValorService } from '../../../services/categoriaAtributoTecnicoValor.service';
import { CategoriaAtributoTecnicoValor } from '../../../interfaces/categoriaAtributoTecnicoValor';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { lastValueFrom } from 'rxjs';
import { AtributoTecnicoVariedadValorService } from '../../../../../service/atributoTecnicoVariedadValor';
import { CategoriaAtributoTecnicoInit } from '../../../interfaces/categoriaAtributoTecnico';
import { AtributoTecnicoVariedadValor } from '../../../../../interface/atributoTecnicoVariedadValor';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-categoria-valor',
  templateUrl: './categoria-valor.component.html'
})
export class CategoriaValorComponent implements OnInit, OnChanges{

  @Input()
  categoriaAtributoTecnico=CategoriaAtributoTecnicoInit;

  atributoTecnicoVariedadValors : AtributoTecnicoVariedadValor[] = [];

  showLoading = false;
  searchText = '';

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  totalModelos : FormArray<any> | undefined;


  constructor(
    private service : CategoriaAtributoTecnicoValorService,
    private serviceAtributoTecnicoVariedadValor:AtributoTecnicoVariedadValorService,
    private fb: FormBuilder,
    private alert: AlertService,
    public authService: AuthService
    ){
   
  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaAtributoTecnico'] && !changes['categoriaAtributoTecnico'].firstChange) {
      this.loadModels();
    }
  
    
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();
    if (this.categoriaAtributoTecnico.id !== 0) {
      this.serviceAtributoTecnicoVariedadValor.postIdAtributoTecnicoVariedad(this.categoriaAtributoTecnico.idAtributoTecnicoVariedad).subscribe(x=>{
        this.atributoTecnicoVariedadValors = x

        this.service.postIdCategoriaAtributoTecnico(this.categoriaAtributoTecnico.id).subscribe(models => {

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoriaAtributoTecnico:[this.categoriaAtributoTecnico.id],
              idAtributoTecnicoVariedadValor:[model.idAtributoTecnicoVariedadValor],
              comentario:[model.comentario],
            });

            this.modelosArray.push(nuevoModelo);
           
          });
          this.totalModelos = this.modelosArray;
  
          if(models.length==0){
            this.add();
          }
  
          this.showLoading = false;
        });
      });
    }
  }

  get modelosArray() {
    const modelos = this.models.get('modelos') as FormArray;

    return this.models.get('modelos') as FormArray;
  }

  getVisibleBusqueda(idAtributoTecnicoVariedadValor:number) {
    const atributo = this.atributoTecnicoVariedadValors.find(x=>x.id == idAtributoTecnicoVariedadValor);

    return !(atributo?.valor.search(this.searchText)!=-1)

  }

  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    //this.idCategoriaAtributoTecnico = (this.models.get('modelos') as FormArray).at(index).value.id;

    
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCategoriaAtributoTecnico:[this.categoriaAtributoTecnico.id],
      idAtributoTecnicoVariedadValor:[0],
      comentario:[''],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
    this.showLoading = true;

    if(!modelo.idAtributoTecnicoVariedadValor){
      this.alert.showAlert('Advertencia', 'Debe tener un valor', 'warning');
      return;
    }
 
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
        const response = await lastValueFrom(this.service.delete(modelo));

        if(response.state==1){
          this.alert.showAlert('Mensaje', 'Eliminado correctamente', 'success');
          this.loadModels();
        }else{
          this.alert.showAlert('Advertencia', response.message, 'warning');
        }
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }

 
}

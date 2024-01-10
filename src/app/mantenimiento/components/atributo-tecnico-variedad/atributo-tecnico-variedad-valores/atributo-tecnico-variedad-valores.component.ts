import { Component, Input, OnInit } from '@angular/core';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { AtributoTecnicoVariedadValor, AtributoTecnicoVariedadValorInit } from '../../../interface/atributoTecnicoVariedadValor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atributo-tecnico-variedad-valores',
  templateUrl: './atributo-tecnico-variedad-valores.component.html'
})
export class AtributoTecnicoVariedadValoresComponent implements OnInit{
  @Input()
  modelAtributoTecnicoVariedad : AtributoTecnicoVariedad = AtributoTecnicoVariedadInit

  models!:FormGroup;

  
  constructor(
    private service: AtributoTecnicoVariedadValorService,
    private fb: FormBuilder
    ){

  }

  ngOnInit(): void {

    this.models = this.fb.group({
      modelos: this.fb.array([]),
    }); 
    
    if(this.modelAtributoTecnicoVariedad.id!=0){
      this.service.postCodAtributoTecnicoVariedad(this.modelAtributoTecnicoVariedad.codigo).subscribe(x=>{
        
        x.forEach(y=>{
          const nuevoModelo = this.fb.group({
            id: [y.id],
            codigo: [y.codigo], 
            codAtributoTecnicoVariedad: [y.codAtributoTecnicoVariedad], 
            valor: [y.valor, Validators.required],
            comentario: [y.comentario],
            alias1: [y.alias1],
            idConvenio: [y.idConvenio],
            estado: [y.estado]
          });

          this.modelosArray.push(nuevoModelo);
          
        })   
      });
    }
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num:number){
     const modelo = this.modelosArray.controls[num].getRawValue();
    
    this.service.update(modelo.id,modelo).subscribe(x=>{
      console.log(x);
      
    });
  }

  add(){
    const nuevoModelo = this.fb.group({
      id: [0],
      codigo: [0], 
      codAtributoTecnicoVariedad: [this.modelAtributoTecnicoVariedad.codigo], 
      valor: ['', Validators.required],
      comentario: [''],
      alias1: [''],
      idConvenio: [1],
      estado: [1]
    });

    this.modelosArray.push(nuevoModelo);
  }

  save(num:number){
    const modelo = this.modelosArray.controls[num].getRawValue();

    this.service.add(modelo).subscribe(x=>{
     
    });
  }
 
  
}

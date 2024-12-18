import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from "../../../interface/atributoTecnicoVariedad";
import { Categoria, CategoriaInit } from "./categoria.interface";
import { CategoriaAtributoTecnicoValor } from "./categoriaAtributoTecnicoValor";

export interface CategoriaAtributoTecnico {
    id:number,
    idCategoria : number ,
    idAtributoTecnicoVariedad:number,
	comentario : string ,
	idTipoUnidadMedida : number ,
	numOrdenSku : string ,
	indVerificado : number ,
    estado: number,
    fechaRegistro: Date,
    AtributoTecnicoVariedad:AtributoTecnicoVariedad
    CategoriaAtributoTecnicoValor:CategoriaAtributoTecnicoValor[]
    Categoria:Categoria
}

export const CategoriaAtributoTecnicoInit: CategoriaAtributoTecnico = {
    id: 0,
    idCategoria: 0,
    idAtributoTecnicoVariedad: 0,
    comentario: "",
    idTipoUnidadMedida: 0,
    numOrdenSku: "",
    indVerificado: 0,
    estado: 1,
    fechaRegistro: new Date(),
    AtributoTecnicoVariedad: AtributoTecnicoVariedadInit,
    CategoriaAtributoTecnicoValor:[],
    Categoria:CategoriaInit
};

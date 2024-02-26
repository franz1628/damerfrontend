
import { AtributoFuncionalVariedadInit } from "../../../interface/atributoFuncionalVariedad";
import { AtributoTecnicoVariedadValor, AtributoTecnicoVariedadValorInit } from "../../../interface/atributoTecnicoVariedadValor";
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from "./categoriaAtributoTecnico";

export interface CategoriaAtributoTecnicoValor {
    id:number,
    idCategoriaAtributoTecnico:number,
    idAtributoTecnicoVariedadValor:number,
    comentario:string,
    estado:number,
    CategoriaAtributoTecnico:CategoriaAtributoTecnico, 
    AtributoTecnicoVariedadValor:AtributoTecnicoVariedadValor
    fechaRegistro:Date
}

export const categoriaAtributoTecnicoValorInit: CategoriaAtributoTecnicoValor = {
    id: 0,
    idCategoriaAtributoTecnico:0,
    idAtributoTecnicoVariedadValor:0,
    comentario:'',
    estado:1,
    CategoriaAtributoTecnico : CategoriaAtributoTecnicoInit,
    AtributoTecnicoVariedadValor:AtributoTecnicoVariedadValorInit,
    fechaRegistro:new Date()
};

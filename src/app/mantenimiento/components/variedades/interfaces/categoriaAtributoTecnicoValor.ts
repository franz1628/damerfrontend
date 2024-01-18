import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from "./categoriaAtributoTecnico";

export interface CategoriaAtributoTecnicoValor {
    id:number,
    idCategoriaAtributoTecnico:number,
    estado:number,
    CategoriaAtributoTecnico:CategoriaAtributoTecnico,
    fechaRegistro:Date
}

export const categoriaAtributoTecnicoValorInit: CategoriaAtributoTecnicoValor = {
    id: 0,
    idCategoriaAtributoTecnico:0,
    estado:1,
    CategoriaAtributoTecnico : CategoriaAtributoTecnicoInit,
    fechaRegistro:new Date()
};
